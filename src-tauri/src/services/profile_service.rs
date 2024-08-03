use std::time::{SystemTime, UNIX_EPOCH};

use diesel::result::Error;
use uuid::Uuid;

use crate::db::models::{NewProfile, Profile, ProfileWithGroup, UpdateProfile};
use crate::repositories::{config_repository, profile_group_repository, profile_repository};

pub fn get_total_profiles_service(
    search: Option<String>,
    group_id: Option<String>,
    script_id: Option<String>,
    status: Option<i32>,
) -> Result<i32, Error> {
    profile_repository::get_total_profiles(search, group_id, script_id, status)
}

pub fn create_profile_service(name: String, group_id: String) -> Result<Profile, Error> {
    let main_path = config_repository::get_config()?
        .path
        .unwrap_or_else(|| "".to_string());
    let new_path = format!("{}/{}", main_path, Uuid::new_v4());

    let new_profile = NewProfile {
        name,
        path: new_path,
        group_id,
    };
    profile_repository::create_profile(new_profile)
}

pub fn get_profile_service(profile_id: String) -> Result<ProfileWithGroup, Error> {
    profile_repository::get_profile(profile_id)
}

pub fn list_profiles_service(
    skip: i64,
    limit: i64,
    search: Option<String>,
    group_id: Option<String>,
    script_id: Option<String>,
    status: Option<i32>,
) -> Result<Vec<ProfileWithGroup>, Error> {
    profile_repository::list_profiles(skip, limit, search, group_id, script_id, status)
}

pub fn update_profile_service(
    profile_id: String,
    updated_profile: UpdateProfile,
) -> Result<Profile, Error> {
    profile_repository::update_profile(profile_id, updated_profile)
}

pub fn delete_profiles_service(profile_ids: Vec<String>) -> Result<(), Error> {
    let paths = profile_repository::delete_profiles(profile_ids)?;

    for path in paths {
        // Check if the path exists before attempting to remove it
        if std::path::Path::new(&path).exists() {
            if let Err(e) = std::fs::remove_dir_all(&path) {
                eprintln!("Failed to remove directory {}: {}", path, e);
            }
        }
    }

    Ok(())
}

pub fn batch_import_profile_service(group_id: String, count: usize) -> Result<usize, Error> {
    // Get the profile group name
    let profile_group = profile_group_repository::get_profile_group(group_id.clone())?;
    let profile_group_name = profile_group.name;

    // Generate the list of NewProfile
    let mut new_profiles = Vec::with_capacity(count);
    let main_path = config_repository::get_config()?
        .path
        .unwrap_or_else(|| "".to_string());

    let current_time = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .expect("Time went backwards")
        .as_millis();

    for i in 0..count {
        // Combine current milliseconds with counter to create a unique timestamp
        let unique_time = current_time + i as u128;
        let name = format!("{}-{}", profile_group_name, unique_time);
        let new_path = format!("{}/{}", main_path, Uuid::new_v4());

        new_profiles.push(NewProfile {
            name,
            path: new_path,
            group_id: group_id.clone(),
        });
    }

    // Pass the list to batch_import_profile
    profile_repository::batch_import_profile(new_profiles)
}
