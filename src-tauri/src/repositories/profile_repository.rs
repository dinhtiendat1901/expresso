use chrono::NaiveDate;
use diesel::prelude::*;
use diesel::result::Error;

use crate::db::connection::establish_connection;
use crate::db::models::{NewProfile, Profile, UpdateProfile};
use crate::db::schema::profile::dsl::*;

pub fn get_total_profiles(search: Option<String>, start_date: Option<NaiveDate>, end_date: Option<NaiveDate>) -> Result<i32, Error> {
    let mut conn = establish_connection();
    let mut query = profile.into_boxed();

    if let Some(search) = search {
        query = query.filter(name.like(format!("%{}%", search)).or(description.like(format!("%{}%", search))));
    }

    if let Some(start_date) = start_date {
        if let Some(end_date) = end_date {
            query = query.filter(created_date.between(start_date.and_hms_opt(0, 0, 0), end_date.and_hms_opt(23, 59, 59)));
        } else {
            query = query.filter(created_date.ge(start_date.and_hms_opt(0, 0, 0)));
        }
    } else if let Some(end_date) = end_date {
        query = query.filter(created_date.le(end_date.and_hms_opt(23, 59, 59)));
    }

    query.count().get_result::<i64>(&mut conn).map(|count| count as i32)
}

pub fn get_profile(profile_id: i32) -> Result<Profile, Error> {
    let mut conn = establish_connection();
    profile.find(profile_id).first(&mut conn)
}

pub fn list_profiles(skip: i64, limit: i64, search: Option<String>, start_date: Option<NaiveDate>, end_date: Option<NaiveDate>) -> Result<Vec<Profile>, Error> {
    let mut conn = establish_connection();
    let mut query = profile.into_boxed();

    if let Some(search) = search {
        query = query.filter(name.like(format!("%{}%", search)).or(description.like(format!("%{}%", search))));
    }

    if let Some(start_date) = start_date {
        if let Some(end_date) = end_date {
            query = query.filter(created_date.between(start_date.and_hms_opt(0, 0, 0), end_date.and_hms_opt(23, 59, 59)));
        } else {
            query = query.filter(created_date.ge(start_date.and_hms_opt(0, 0, 0)));
        }
    } else if let Some(end_date) = end_date {
        query = query.filter(created_date.le(end_date.and_hms_opt(23, 59, 59)));
    }

    query = query.order_by(created_date.desc());

    query.offset(skip).limit(limit).load::<Profile>(&mut conn)
}

pub fn create_profile(new_profile: NewProfile) -> Result<Profile, Error> {
    let mut conn = establish_connection();
    diesel::insert_into(profile)
        .values(&new_profile)
        .execute(&mut conn)?;

    profile.order(id.desc()).first(&mut conn)
}

pub fn update_profile(profile_id: i32, updated_profile: UpdateProfile) -> Result<Profile, Error> {
    let mut conn = establish_connection();
    diesel::update(profile.find(profile_id))
        .set(&updated_profile)
        .execute(&mut conn)?;

    profile.find(profile_id).first(&mut conn)
}

pub fn delete_profiles(profile_ids: Vec<i32>) -> Result<Vec<String>, Error> {
    let mut conn = establish_connection();

    // Fetch the paths before deletion
    let paths: Vec<String> = profile
        .filter(id.eq_any(&profile_ids))
        .select(path)
        .load::<Option<String>>(&mut conn)?
        .into_iter()
        .filter_map(|p| p)
        .collect();

    diesel::delete(profile.filter(id.eq_any(profile_ids))).execute(&mut conn)?;
    Ok(paths)
}
