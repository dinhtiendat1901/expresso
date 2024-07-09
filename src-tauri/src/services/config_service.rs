use diesel::result::Error;

use crate::db::models::Config;
use crate::repositories::config_repository;

pub fn get_config_service() -> Result<Config, Error> {
    config_repository::get_config()
}

pub fn set_config_service(new_path: Option<String>) -> Result<Config, Error> {
    config_repository::set_config(new_path)
}
