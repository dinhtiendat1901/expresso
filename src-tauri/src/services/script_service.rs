use diesel::result::Error;

use crate::db::models::{NewScript, Script, UpdateScript};
use crate::repositories::script_repository;
use crate::services::handle_script;

pub fn get_total_scripts_service() -> Result<i32, Error> {
    script_repository::get_total_scripts()
}

pub fn create_script_service(new_script: NewScript) -> Result<Script, Error> {
    let path = &new_script.path;
    let contain_string = "const target = await browser.waitForTarget";
    let wrap_pattern_1 = "browser.once('targetcreated', async (target) => {\n...\n})";
    let wrap_pattern_2 = "await (\n...\n)";
    let wrap_pattern_3 = "await new Promise(r => setTimeout(r, 1000));\n...";
    let start_string = "await puppeteer.Locator.race([";
    let end_string = "])";
    let start_string_1 = "await (";
    let end_string_1 = ";";
    let start_line = "const browser = await puppeteer.launch();";
    let end_line = "await browser.close();";

    // Step 1: Find the closest braces with content
    let list_contents_1 = handle_script::find_closest_braces_with_content(path, contain_string)
        .expect("Error finding closest braces");

    // Step 2: Wrap the content
    let list_wrapped_contents_1 = handle_script::wrap_content(list_contents_1.clone(), wrap_pattern_1)
        .expect("Error wrapping content");


    // Step 3: Write the file with the wrapped content
    handle_script::write_file_with_list_content(path, list_wrapped_contents_1)
        .expect("Error writing file");

    handle_script::remove_specific_line(path, "const target = await browser.waitForTarget").expect("TODO: panic message");

    let list_contents_2 = handle_script::get_content_between_string(path, start_string, end_string, false)
        .expect("Error finding closest braces");

    let list_wrapped_contents_2 = handle_script::wrap_content(list_contents_2.clone(), wrap_pattern_2)
        .expect("Error wrapping content");

    handle_script::write_file_with_list_content(path, list_wrapped_contents_2)
        .expect("Error writing file");

    handle_script::remove_specific_line(path, ".setTimeout(timeout)").expect("TODO: panic message");
    handle_script::remove_specific_line(path, ".on('action', () => startWaitingForEvents())").expect("TODO: panic message");
    handle_script::replace_words(path, "puppeteer.Locator", "Promise").expect("TODO: panic message");
    handle_script::replace_words(path, "targetPage.locator", "targetPage.waitForSelector").expect("TODO: panic message");
    handle_script::replace_words(path, ".fill(", ".type(").expect("TODO: panic message");

    let list_contents_3 = handle_script::get_content_between_string(path, start_string_1, end_string_1, true)
        .expect("Error finding closest braces");
    let list_filtered_contents = handle_script::filter_list_content(list_contents_3.clone(), ".type(");
    let list_wrapped_contents_3 = handle_script::wrap_content(list_filtered_contents, wrap_pattern_3)
        .expect("Error wrapping content");
    handle_script::write_file_with_list_content(path, list_wrapped_contents_3)
        .expect("Error writing file");
    handle_script::cut_off_file(path, start_line, end_line).expect("TODO: panic message");
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
