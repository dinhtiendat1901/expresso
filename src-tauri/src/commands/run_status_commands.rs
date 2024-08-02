use tauri::command;

use crate::db::models::NewRunStatus;
use crate::services::run_status_service;

#[command]
#[allow(dead_code)]
pub fn batch_import_run_status(run_status_list: Vec<NewRunStatus>) -> Result<usize, String> {
    run_status_service::batch_import_run_status_service(run_status_list).map_err(|e| e.to_string())
}

#[command]
#[allow(dead_code)]
pub fn delete_run_status_by_profile_ids(profile_ids: Vec<String>) -> Result<usize, String> {
    run_status_service::delete_run_status_by_profile_ids_service(profile_ids)
        .map_err(|e| e.to_string())
}

#[command]
#[allow(dead_code)]
pub fn delete_run_status_by_script_ids(script_ids: Vec<String>) -> Result<usize, String> {
    run_status_service::delete_run_status_by_script_ids_service(script_ids)
        .map_err(|e| e.to_string())
}
