use diesel::prelude::*;
use diesel::result::Error;

use crate::db::connection::establish_connection;
use crate::db::models::{NewProfileGroup, ProfileGroup, UpdateProfileGroup};
use crate::db::schema::profile;
use crate::db::schema::profile_group::dsl::*;

pub fn get_profile_group(profile_group_id: String) -> Result<ProfileGroup, Error> {
    let mut conn = establish_connection();
    profile_group.find(profile_group_id).first(&mut conn)
}

pub fn list_profile_groups() -> Result<Vec<ProfileGroup>, Error> {
    let mut conn = establish_connection();
    profile_group.load::<ProfileGroup>(&mut conn)
}

pub fn get_total_profile_groups() -> Result<i32, Error> {
    let mut conn = establish_connection();
    profile_group.count().get_result::<i64>(&mut conn).map(|count| count as i32)
}

pub fn create_profile_group(new_profile_group: NewProfileGroup) -> Result<ProfileGroup, Error> {
    let mut conn = establish_connection();
    diesel::insert_into(profile_group)
        .values(&new_profile_group)
        .execute(&mut conn)?;

    profile_group.order(id.desc()).first(&mut conn)
}

pub fn update_profile_group(profile_group_id: String, updated_profile_group: UpdateProfileGroup) -> Result<ProfileGroup, Error> {
    let mut conn = establish_connection();
    diesel::update(profile_group.find(profile_group_id.clone()))
        .set(&updated_profile_group)
        .execute(&mut conn)?;

    profile_group.find(profile_group_id).first(&mut conn)
}

pub fn delete_profile_groups(profile_group_ids: Vec<String>) -> Result<Vec<String>, Error> {
    let mut conn = establish_connection();

    // Get related profile IDs
    let related_profile_ids: Vec<String> = profile::table
        .filter(profile::group_id.eq_any(&profile_group_ids))
        .select(profile::id)
        .load(&mut conn)?;

    // Delete profile groups
    diesel::delete(profile_group.filter(id.eq_any(&profile_group_ids)))
        .execute(&mut conn)?;

    Ok(related_profile_ids)
}
