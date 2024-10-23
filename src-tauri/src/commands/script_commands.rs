use tauri::command;

use crate::db::models::{NewScript, Script, UpdateScript};
use crate::services::script_service;

#[command]
#[allow(dead_code)]
pub fn read_total_scripts() -> Result<i32, String> {
    script_service::get_total_scripts_service().map_err(|e| e.to_string())
}

#[command]
#[allow(dead_code)]
pub fn create_script(name: String, path: String) -> Result<Script, String> {
    let new_script = NewScript { name, path };
    script_service::create_script_service(new_script).map_err(|e| e.to_string())
}

#[command]
#[allow(dead_code)]
pub fn read_script(script_id: String) -> Result<Script, String> {
    script_service::get_script_service(script_id).map_err(|e| e.to_string())
}

#[command]
#[allow(dead_code)]
pub fn read_scripts(skip: i64, limit: i64) -> Result<Vec<Script>, String> {
    script_service::list_scripts_service(skip, limit).map_err(|e| e.to_string())
}

#[command]
#[allow(dead_code)]
pub fn update_script(
    script_id: String,
    name: Option<String>,
    path: Option<String>,
) -> Result<Script, String> {
    let updated_script = UpdateScript { name, path };
    script_service::update_script_service(script_id, updated_script).map_err(|e| e.to_string())
}

#[command]
#[allow(dead_code)]
pub fn delete_scripts(script_ids: Vec<String>) -> Result<String, String> {
    script_service::delete_scripts_service(script_ids)
        .map(|_| "Scripts deleted successfully".to_string())
        .map_err(|e| e.to_string())
}
