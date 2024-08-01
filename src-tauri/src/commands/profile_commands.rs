use tauri::command;

use crate::db::models::{Profile, ProfileWithGroup, UpdateProfile};
use crate::services::profile_service;

#[command]
#[allow(dead_code)]
pub fn read_total_profiles(search: Option<String>, group_id: Option<String>) -> Result<i32, String> {
    profile_service::get_total_profiles_service(search, group_id)
        .map_err(|e| e.to_string())
}

#[command]
#[allow(dead_code)]
pub fn create_profile(name: String, group_id: String) -> Result<Profile, String> {
    profile_service::create_profile_service(name, group_id)
        .map_err(|e| e.to_string())
}

#[command]
#[allow(dead_code)]
pub fn read_profile(profile_id: String) -> Result<ProfileWithGroup, String> {
    profile_service::get_profile_service(profile_id)
        .map_err(|e| e.to_string())
}

#[command]
#[allow(dead_code)]
pub fn read_profiles(skip: i64, limit: i64, search: Option<String>, group_id: Option<String>) -> Result<Vec<ProfileWithGroup>, String> {
    profile_service::list_profiles_service(skip, limit, search, group_id)
        .map_err(|e| e.to_string())
}

#[command]
#[allow(dead_code)]
pub fn update_profile(profile_id: String, name: Option<String>, path: Option<String>, group_id: Option<String>) -> Result<Profile, String> {
    let updated_profile = UpdateProfile { name, path, group_id };
    profile_service::update_profile_service(profile_id, updated_profile)
        .map_err(|e| e.to_string())
}

#[command]
#[allow(dead_code)]
pub fn delete_profiles(profile_ids: Vec<String>) -> Result<String, String> {
    profile_service::delete_profiles_service(profile_ids)
        .map(|_| "Profiles deleted successfully".to_string())
        .map_err(|e| e.to_string())
}

#[command]
#[allow(dead_code)]
pub fn batch_import_profile(group_id: String, count: usize) -> Result<usize, String> {
    profile_service::batch_import_profile_service(group_id, count)
        .map_err(|e| e.to_string())
}
