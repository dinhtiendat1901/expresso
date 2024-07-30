use tauri::command;

use crate::db::models::ProfileGroup;
use crate::services::profile_group_service;

#[command]
#[allow(dead_code)]
pub fn create_profile_group(name: String, color: String) -> Result<ProfileGroup, String> {
    profile_group_service::create_profile_group_service(name, color).map_err(|e| e.to_string())
}

#[command]
#[allow(dead_code)]
pub fn read_profile_group(profile_group_id: String) -> Result<ProfileGroup, String> {
    profile_group_service::get_profile_group_service(profile_group_id).map_err(|e| e.to_string())
}

#[command]
#[allow(dead_code)]
pub fn list_profile_groups() -> Result<Vec<ProfileGroup>, String> {
    profile_group_service::list_profile_groups_service().map_err(|e| e.to_string())
}

#[command]
#[allow(dead_code)]
pub fn read_total_profile_groups() -> Result<i32, String> {
    profile_group_service::get_total_profile_groups_service().map_err(|e| e.to_string())
}

#[command]
#[allow(dead_code)]
pub fn update_profile_group(
    profile_group_id: String,
    name: Option<String>,
    color: Option<String>
) -> Result<ProfileGroup, String> {
    profile_group_service::update_profile_group_service(profile_group_id, name, color)
        .map_err(|e| e.to_string())
}

#[command]
#[allow(dead_code)]
pub fn delete_profile_groups(profile_group_ids: Vec<String>) -> Result<String, String> {
    profile_group_service::delete_profile_groups_service(profile_group_ids)
        .map(|_| "Profile groups deleted successfully".to_string())
        .map_err(|e| e.to_string())
}
