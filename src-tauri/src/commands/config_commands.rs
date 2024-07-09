use tauri::command;

use crate::db::models::Config;
use crate::services::config_service;

#[command]
#[allow(dead_code)]
pub fn get_config() -> Result<Config, String> {
    config_service::get_config_service().map_err(|e| e.to_string())
}

#[command]
#[allow(dead_code)]
pub fn set_config(path: Option<String>) -> Result<Config, String> {
    config_service::set_config_service(path).map_err(|e| e.to_string())
}
