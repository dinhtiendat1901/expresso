use diesel::result::Error;

use crate::db::models::{NewScript, Script, UpdateScript};
use crate::repositories::script_repository;
use crate::services::handle_script::{get_content_between_line, remove_line_and_wrap_with_pattern, replace_words};

pub fn get_total_scripts_service() -> Result<i32, Error> {
    script_repository::get_total_scripts()
}

pub fn create_script_service(new_script: NewScript) -> Result<Script, Error> {
    let start_str = "const target = await browser.waitForTarget";
    let replace_pattern = "browser.once('targetcreated', async (target) => {...})";
    let start_line = "const browser = await puppeteer.launch();";
    let end_line = "await browser.close();";
    remove_line_and_wrap_with_pattern(&new_script.path, start_str, replace_pattern).expect("TODO: panic message");
    replace_words(&new_script.path, "puppeteer.Locator", "Locator").expect("TODO: panic message");
    get_content_between_line(&new_script.path, start_line, end_line).expect("TODO: panic message");
    script_repository::create_script(new_script)
}

pub fn get_script_service(script_id: i32) -> Result<Script, Error> {
    script_repository::get_script(script_id)
}

pub fn list_scripts_service(skip: i64, limit: i64) -> Result<Vec<Script>, Error> {
    script_repository::list_scripts(skip, limit)
}

pub fn update_script_service(script_id: i32, updated_script: UpdateScript) -> Result<Script, Error> {
    script_repository::update_script(script_id, updated_script)
}

pub fn delete_scripts_service(script_ids: Vec<i32>) -> Result<(), Error> {
    script_repository::delete_scripts(script_ids)
}
