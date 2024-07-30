use diesel::prelude::*;
use diesel::result::Error;

use crate::db::connection::establish_connection;
use crate::db::models::{NewProfile, Profile, ProfileGroup, ProfileWithGroup, UpdateProfile};
use crate::db::schema::{profile, profile_group};

pub fn get_total_profiles(search: Option<String>) -> Result<i32, Error> {
    let mut conn = establish_connection();
    let mut query = profile::table.into_boxed();

    if let Some(search) = search {
        query = query.filter(profile::name.like(format!("%{}%", search)));
    }

    query
        .count()
        .get_result::<i64>(&mut conn)
        .map(|count| count as i32)
}

pub fn get_profile(profile_id: String) -> Result<ProfileWithGroup, Error> {
    let mut conn = establish_connection();
    profile::table
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
        })
}

pub fn list_profiles(
    skip: i64,
    limit: i64,
    search: Option<String>,
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

    query
        .offset(skip)
        .limit(limit)
        .load::<(String, String, String, ProfileGroup)>(&mut conn)
        .map(|results| {
            results
                .into_iter()
                .map(|(id, name, path, profile_group)| ProfileWithGroup {
                    id,
                    name,
                    path,
                    profile_group,
                })
                .collect()
        })
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
