use diesel::result::Error;

use crate::db::models::{NewScript, Script, UpdateScript};
use crate::repositories::script_repository;
use crate::services::handle_script::ScriptFile;

pub fn get_total_scripts_service() -> Result<i32, Error> {
    script_repository::get_total_scripts()
}

pub fn create_script_service(new_script: NewScript) -> Result<Script, Error> {
    let mut script_file = ScriptFile {
        path: String::from(&new_script.path),
        content: Vec::new(),
        list_filtered: Vec::new(),
    };

    script_file.read_file().expect("Error");
    script_file.find_closest_braces("const target = await browser.waitForTarget", false).wrap_with_pattern("browser.once('targetcreated', async (target) => {\n...\n})").rewrite_content();
    script_file.find_between_string("await puppeteer.Locator.race([", "])", false).wrap_with_pattern("await (\n...\n)").rewrite_content();
    script_file.find_closest_braces("browser.once('targetcreated', async (target)", false).wrap_with_pattern("new Promise((resolve, reject) => {
                                        ...
                                     })").rewrite_content();
    script_file.remove_lines("const target = await browser.waitForTarget").remove_lines(".setTimeout(timeout)").remove_lines(".on('action', () => startWaitingForEvents())").remove_lines("startWaitingForEvents()").replace_words("puppeteer.Locator", "Promise").replace_words("targetPage.locator", "targetPage.waitForSelector").replace_words(".fill(", ".type(");
    script_file.find_between_string("await (", ";", true).filter_list_content(".type(").wrap_with_pattern("await new Promise(r => setTimeout(r, 1000));\n...").rewrite_content();
    script_file.find_closest_braces("const targetPage = await target.page()", false).wrap_with_pattern("try {
                    ...
                    resolve();
                } catch (error) {
                    reject(error);
                }").rewrite_content();
    script_file.find_closest_braces("new Promise((resolve, reject)", true).remove_brace().rewrite_content();
    script_file.find_closest_braces("browser.once('targetcreated', async (target)", true).wrap_with_pattern("...,").merge_element_consecutive().wrap_with_pattern("await Promise.all([
                                    ...
                                    ])").rewrite_content();
    script_file.cut_off_file("const browser = await puppeteer.launch();", "await browser.close();");

    script_file.rewrite_file().expect("Error");
    script_repository::create_script(new_script)
}

pub fn get_script_service(script_id: String) -> Result<Script, Error> {
    script_repository::get_script(script_id)
}

pub fn list_scripts_service(skip: i64, limit: i64) -> Result<Vec<Script>, Error> {
    script_repository::list_scripts(skip, limit)
}

pub fn update_script_service(script_id: String, updated_script: UpdateScript) -> Result<Script, Error> {
    script_repository::update_script(script_id, updated_script)
}

pub fn delete_scripts_service(script_ids: Vec<String>) -> Result<(), Error> {
    script_repository::delete_scripts(script_ids)
}
