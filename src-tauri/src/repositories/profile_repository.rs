use diesel::prelude::*;
use diesel::result::Error;

use crate::db::connection::establish_connection;
use crate::db::models::{NewProfile, Profile, ProfileGroup, ProfileWithGroup, RunStatusByProfile, UpdateProfile};
use crate::db::schema::{profile, profile_group, run_status, script};

pub fn get_total_profiles(
    search: Option<String>,
    group_id: Option<String>,
    script_id: Option<String>,
    status: Option<i32>,
) -> Result<i32, Error> {
    let mut conn = establish_connection();
    let mut query = profile::table.into_boxed();

    if let Some(search) = search {
        query = query.filter(profile::name.like(format!("%{}%", search)));
    }

    if let Some(group_id) = group_id {
        query = query.filter(profile::group_id.eq(group_id));
    }

    if let Some(script_id) = script_id {
        if let Some(status) = status {
            query = query.filter(profile::id.eq_any(
                run_status::table
                    .filter(run_status::script_id.eq(script_id).and(run_status::status.eq(status)))
                    .select(run_status::profile_id),
            ));
        } else {
            query = query.filter(profile::id.ne_all(
                run_status::table
                    .filter(run_status::script_id.eq(script_id))
                    .select(run_status::profile_id),
            ));
        }
    }

    query
        .count()
        .get_result::<i64>(&mut conn)
        .map(|count| count as i32)
}

pub fn get_profile(profile_id: String) -> Result<ProfileWithGroup, Error> {
    let mut conn = establish_connection();
    let profile_with_group = profile::table
        .inner_join(profile_group::table)
        .filter(profile::id.eq(profile_id))
        .select((
            profile::id,
            profile::name,
            profile::path,
            profile_group::all_columns,
        ))
        .first::<(String, String, String, ProfileGroup)>(&mut conn)
        .map(|(id, name, path, profile_group)| ProfileWithGroup {
            id,
            name,
            path,
            profile_group,
            run_status_by_profiles: vec![],  // Initialize empty
            success: 0,
            fail: 0,
        })?;

    // Fetch related run statuses
    let run_status_by_profiles = get_run_status_by_profile(&profile_with_group.id, &mut conn)?;
    let (success, fail) = calculate_success_fail(&run_status_by_profiles);
    Ok(ProfileWithGroup {
        run_status_by_profiles,
        success,
        fail,
        ..profile_with_group
    })
}

fn get_run_status_by_profile(profile_id: &str, conn: &mut SqliteConnection) -> Result<Vec<RunStatusByProfile>, Error> {
    run_status::table
        .inner_join(script::table)
        .filter(run_status::profile_id.eq(profile_id))
        .select((script::name, run_status::status, run_status::detail))
        .load::<(String, i32, Option<String>)>(conn)
        .map(|results| {
            results.into_iter().map(|(script_name, status, detail)| RunStatusByProfile {
                script_name,
                status,
                detail,
            }).collect()
        })
}

fn calculate_success_fail(run_status_by_profiles: &Vec<RunStatusByProfile>) -> (i32, i32) {
    let success = run_status_by_profiles.iter().filter(|rs| rs.status == 1).count() as i32;
    let fail = run_status_by_profiles.iter().filter(|rs| rs.status == 0).count() as i32;
    (success, fail)
}

pub fn list_profiles(
    skip: i64,
    limit: i64,
    search: Option<String>,
    group_id: Option<String>,
    script_id: Option<String>,
    status: Option<i32>,
) -> Result<Vec<ProfileWithGroup>, Error> {
    let mut conn = establish_connection();
    let mut query = profile::table
        .inner_join(profile_group::table)
        .select((
            profile::id,
            profile::name,
            profile::path,
            profile_group::all_columns,
        ))
        .into_boxed();

    if let Some(search) = search {
        query = query.filter(profile::name.like(format!("%{}%", search)));
    }

    if let Some(group_id) = group_id {
        query = query.filter(profile::group_id.eq(group_id));
    }

    if let Some(script_id) = script_id {
        if let Some(status) = status {
            query = query.filter(profile::id.eq_any(
                run_status::table
                    .filter(run_status::script_id.eq(script_id).and(run_status::status.eq(status)))
                    .select(run_status::profile_id),
            ));
        } else {
            query = query.filter(profile::id.ne_all(
                run_status::table
                    .filter(run_status::script_id.eq(script_id))
                    .select(run_status::profile_id),
            ));
        }
    }

    let profiles_with_group = query
        .offset(skip)
        .limit(limit)
        .load::<(String, String, String, ProfileGroup)>(&mut conn)?
        .into_iter()
        .map(|(id, name, path, profile_group)| ProfileWithGroup {
            id,
            name,
            path,
            profile_group,
            run_status_by_profiles: vec![],  // Initialize empty
            success: 0,
            fail: 0,
        })
        .collect::<Vec<ProfileWithGroup>>();

    // Fetch related run statuses for each profile
    profiles_with_group.into_iter().map(|mut profile_with_group| {
        let run_status_by_profiles = get_run_status_by_profile(&profile_with_group.id, &mut conn)?;
        let (success, fail) = calculate_success_fail(&run_status_by_profiles);
        profile_with_group.run_status_by_profiles = run_status_by_profiles;
        profile_with_group.success = success;
        profile_with_group.fail = fail;
        Ok(profile_with_group)
    }).collect()
}

pub fn create_profile(new_profile: NewProfile) -> Result<Profile, Error> {
    let mut conn = establish_connection();
    diesel::insert_into(profile::table)
        .values(&new_profile)
        .execute(&mut conn)?;

    profile::table.order(profile::id.desc()).first(&mut conn)
}

pub fn update_profile(
    profile_id: String,
    updated_profile: UpdateProfile,
) -> Result<Profile, Error> {
    let mut conn = establish_connection();
    diesel::update(profile::table.find(profile_id.clone()))
        .set(&updated_profile)
        .execute(&mut conn)?;

    profile::table.find(profile_id).first(&mut conn)
}

pub fn delete_profiles(profile_ids: Vec<String>) -> Result<Vec<String>, Error> {
    let mut conn = establish_connection();

    let profiles_to_delete: Vec<String> = profile::table
        .filter(profile::id.eq_any(&profile_ids))
        .select(profile::path)
        .load(&mut conn)?;

    diesel::delete(profile::table.filter(profile::id.eq_any(profile_ids))).execute(&mut conn)?;

    Ok(profiles_to_delete)
}

pub fn batch_import_profile(new_profiles: Vec<NewProfile>) -> Result<usize, Error> {
    let conn = &mut establish_connection();
    conn.transaction::<_, Error, _>(|conn| {
        // Define the batch size
        let batch_size = 1000;
        let mut total_inserted = 0;

        // Insert in batches
        for chunk in new_profiles.chunks(batch_size) {
            total_inserted += diesel::insert_into(profile::table)
                .values(chunk)
                .execute(conn)?;
        }

        Ok(total_inserted)
    })
}
