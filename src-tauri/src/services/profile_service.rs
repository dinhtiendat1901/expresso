use std::fs;

use chrono::NaiveDate;
use diesel::result::Error;
use uuid::Uuid;

use crate::db::models::{NewProfile, Profile, UpdateProfile};
use crate::repositories::{config_repository, profile_repository};

pub fn get_total_profiles_service(search: Option<String>, start_date: Option<NaiveDate>, end_date: Option<NaiveDate>) -> Result<i32, Error> {
    profile_repository::get_total_profiles(search, start_date, end_date)
}

pub fn create_profile_service(name: Option<String>, description: Option<String>) -> Result<Profile, Error> {
    let main_path = config_repository::get_config()?.path.unwrap_or_else(|| "".to_string());
    let new_path = format!("{}/{}", main_path, Uuid::new_v4());

    let new_profile = NewProfile { name, description, path: Some(new_path) };
    profile_repository::create_profile(new_profile)
}

pub fn get_profile_service(profile_id: i32) -> Result<Profile, Error> {
    profile_repository::get_profile(profile_id)
}

pub fn list_profiles_service(skip: i64, limit: i64, search: Option<String>, start_date: Option<NaiveDate>, end_date: Option<NaiveDate>) -> Result<Vec<Profile>, Error> {
    profile_repository::list_profiles(skip, limit, search, start_date, end_date)
}

pub fn update_profile_service(profile_id: i32, updated_profile: UpdateProfile) -> Result<Profile, Error> {
    profile_repository::update_profile(profile_id, updated_profile)
}

pub fn delete_profiles_service(profile_ids: Vec<i32>) -> Result<(), Error> {
    let paths = profile_repository::delete_profiles(profile_ids)?;

    for path in paths {
        if let Err(e) = fs::remove_dir_all(&path) {
            eprintln!("Failed to remove directory {}: {}", path, e);
        }
    }

    Ok(())
}
