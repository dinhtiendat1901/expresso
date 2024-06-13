use diesel::prelude::*;
use diesel::result::Error;

use crate::db::connection::establish_connection;
use crate::db::models::{NewProfile, Profile, UpdateProfile};
use crate::db::schema::profile::dsl::*;

// Function to create a new profile
pub fn create_profile(new_profile: NewProfile) -> Result<Profile, Error> {
    let mut conn = establish_connection();
    diesel::insert_into(profile)
        .values(&new_profile)
        .execute(&mut conn)?;

    profile.order(id.desc()).first(&mut conn)
}

// Function to get a profile by ID
pub fn get_profile(profile_id: i32) -> Result<Profile, Error> {
    let mut conn = establish_connection();
    profile.find(profile_id).first(&mut conn)
}

// Function to update a profile
pub fn update_profile(profile_id: i32, updated_profile: UpdateProfile) -> Result<Profile, Error> {
    let mut conn = establish_connection();
    diesel::update(profile.find(profile_id))
        .set(&updated_profile)
        .execute(&mut conn)?;

    profile.find(profile_id).first(&mut conn)
}

// Function to delete a profile
pub fn delete_profile(profile_id: i32) -> Result<usize, Error> {
    let mut conn = establish_connection();
    diesel::delete(profile.find(profile_id)).execute(&mut conn)
}

// Function to list all profiles
pub fn list_profiles() -> Result<Vec<Profile>, Error> {
    let mut conn = establish_connection();
    profile.load::<Profile>(&mut conn)
}
