use diesel::result::Error;

use crate::db::models::{NewProfileGroup, ProfileGroup, UpdateProfileGroup};
use crate::repositories::profile_group_repository;
use crate::services::profile_service;

pub fn get_profile_group_service(profile_group_id: String) -> Result<ProfileGroup, Error> {
    profile_group_repository::get_profile_group(profile_group_id)
}

pub fn list_profile_groups_service() -> Result<Vec<ProfileGroup>, Error> {
    profile_group_repository::list_profile_groups()
}

pub fn get_total_profile_groups_service() -> Result<i32, Error> {
    profile_group_repository::get_total_profile_groups()
}

pub fn create_profile_group_service(name: String, color: String) -> Result<ProfileGroup, Error> {
    let new_profile_group = NewProfileGroup { name, color };
    profile_group_repository::create_profile_group(new_profile_group)
}

pub fn update_profile_group_service(
    profile_group_id: String,
    name: Option<String>,
    color: Option<String>,
) -> Result<ProfileGroup, Error> {
    let updated_profile_group = UpdateProfileGroup { name, color };
    profile_group_repository::update_profile_group(profile_group_id, updated_profile_group)
}

pub fn delete_profile_groups_service(profile_group_ids: Vec<String>) -> Result<(), Error> {
    // Delete profile groups and get related profile IDs
    let related_profile_ids = profile_group_repository::delete_profile_groups(profile_group_ids)?;

    // Delete related profiles
    profile_service::delete_profiles_service(related_profile_ids)
}
