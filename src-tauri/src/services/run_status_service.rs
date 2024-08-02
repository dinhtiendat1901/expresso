use diesel::result::Error;

use crate::db::models::NewRunStatus;
use crate::repositories::run_status_repository;

pub fn batch_import_run_status_service(run_status_list: Vec<NewRunStatus>) -> Result<usize, Error> {
    run_status_repository::batch_import_run_status(run_status_list)
}

pub fn delete_run_status_by_profile_ids_service(profile_ids: Vec<String>) -> Result<usize, Error> {
    run_status_repository::delete_run_status_by_profile_ids(profile_ids)
}

pub fn delete_run_status_by_script_ids_service(script_ids: Vec<String>) -> Result<usize, Error> {
    run_status_repository::delete_run_status_by_script_ids(script_ids)
}
