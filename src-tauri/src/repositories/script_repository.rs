use diesel::prelude::*;
use diesel::result::Error;

use crate::db::connection::establish_connection;
use crate::db::models::{NewScript, Script, UpdateScript};
use crate::db::schema::script::dsl::*;

pub fn get_total_scripts() -> Result<i32, Error> {
    let mut conn = establish_connection();
    script
        .count()
        .get_result::<i64>(&mut conn)
        .map(|count| count as i32)
}

pub fn get_script(script_id: String) -> Result<Script, Error> {
    let mut conn = establish_connection();
    script.find(script_id).first(&mut conn)
}

pub fn list_scripts(skip: i64, limit: i64) -> Result<Vec<Script>, Error> {
    let mut conn = establish_connection();
    script.offset(skip).limit(limit).load::<Script>(&mut conn)
}

pub fn create_script(new_script: NewScript) -> Result<Script, Error> {
    let mut conn = establish_connection();
    diesel::insert_into(script)
        .values(&new_script)
        .execute(&mut conn)?;

    script.order(id.desc()).first(&mut conn)
}

pub fn update_script(script_id: String, updated_script: UpdateScript) -> Result<Script, Error> {
    let mut conn = establish_connection();
    diesel::update(script.find(script_id.clone()))
        .set(&updated_script)
        .execute(&mut conn)?;

    script.find(script_id).first(&mut conn)
}

pub fn delete_scripts(script_ids: Vec<String>) -> Result<(), Error> {
    let mut conn = establish_connection();
    diesel::delete(script.filter(id.eq_any(script_ids))).execute(&mut conn)?;
    Ok(())
}
