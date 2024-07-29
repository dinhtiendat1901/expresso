use diesel::prelude::*;
use diesel::result::Error;

use crate::db::connection::establish_connection;
use crate::db::models::{NewProfile, Profile, UpdateProfile};
use crate::db::schema::profile::dsl::*;

pub fn get_total_profiles(search: Option<String>) -> Result<i32, Error> {
    let mut conn = establish_connection();
    let mut query = profile.into_boxed();

    if let Some(search) = search {
        query = query.filter(name.like(format!("%{}%", search)));
    }

    query.count().get_result::<i64>(&mut conn).map(|count| count as i32)
}

pub fn get_profile(profile_id: String) -> Result<Profile, Error> {
    let mut conn = establish_connection();
    profile.find(profile_id).first(&mut conn)
}

pub fn list_profiles(skip: i64, limit: i64, search: Option<String>) -> Result<Vec<Profile>, Error> {
    let mut conn = establish_connection();
    let mut query = profile.into_boxed();

    if let Some(search) = search {
        query = query.filter(name.like(format!("%{}%", search)));
    }

    query.offset(skip).limit(limit).load::<Profile>(&mut conn)
}

pub fn create_profile(new_profile: NewProfile) -> Result<Profile, Error> {
    let mut conn = establish_connection();
    diesel::insert_into(profile)
        .values(&new_profile)
        .execute(&mut conn)?;

    profile.order(id.desc()).first(&mut conn)
}

pub fn update_profile(profile_id: String, updated_profile: UpdateProfile) -> Result<Profile, Error> {
    let mut conn = establish_connection();
    diesel::update(profile.find(profile_id.clone()))
        .set(&updated_profile)
        .execute(&mut conn)?;

    profile.find(profile_id).first(&mut conn)
}

pub fn delete_profiles(profile_ids: Vec<String>) -> Result<Vec<String>, Error> {
    let mut conn = establish_connection();

    let profiles_to_delete: Vec<String> = profile
        .filter(id.eq_any(&profile_ids))
        .select(path)
        .load(&mut conn)?;

    diesel::delete(profile.filter(id.eq_any(profile_ids))).execute(&mut conn)?;

    Ok(profiles_to_delete)
}
