use chrono::NaiveDate;
use tauri::command;

use crate::db::models::{NewProfile, Profile, UpdateProfile};
use crate::services::profile_service;

#[command]
pub fn read_total_profiles(search: Option<String>, start_date: Option<NaiveDate>, end_date: Option<NaiveDate>) -> Result<i32, String> {
    profile_service::get_total_profiles_service(search, start_date, end_date)
        .map_err(|e| e.to_string())
}

#[command]
pub fn create_profile(name: Option<String>, description: Option<String>) -> Result<Profile, String> {
    let new_profile = NewProfile { name, description };
    profile_service::create_profile_service(new_profile)
        .map_err(|e| e.to_string())
}

#[command]
pub fn read_profile(profile_id: i32) -> Result<Profile, String> {
    profile_service::get_profile_service(profile_id)
        .map_err(|e| e.to_string())
}

#[command]
pub fn read_profiles(skip: i64, limit: i64, search: Option<String>, start_date: Option<NaiveDate>, end_date: Option<NaiveDate>) -> Result<Vec<Profile>, String> {
    profile_service::list_profiles_service(skip, limit, search, start_date, end_date)
        .map_err(|e| e.to_string())
}

#[command]
pub fn update_profile(profile_id: i32, name: Option<String>, description: Option<String>) -> Result<Profile, String> {
    let updated_profile = UpdateProfile { name, description };
    profile_service::update_profile_service(profile_id, updated_profile)
        .map_err(|e| e.to_string())
}

#[command]
pub fn delete_profiles(profile_ids: Vec<i32>) -> Result<String, String> {
    profile_service::delete_profiles_service(profile_ids)
        .map(|_| "Profiles deleted successfully".to_string())
        .map_err(|e| e.to_string())
}
