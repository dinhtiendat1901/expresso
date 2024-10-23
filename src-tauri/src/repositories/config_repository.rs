use diesel::prelude::*;
use diesel::result::Error;

use crate::db::connection::establish_connection;
use crate::db::models::Config;
use crate::db::schema::config::dsl::*;

pub fn get_config() -> Result<Config, Error> {
    let mut conn = establish_connection();
    config.find(1).first(&mut conn)
}

pub fn set_config(new_path: Option<String>) -> Result<Config, Error> {
    let mut conn = establish_connection();
    let new_config = Config {
        id: 1,
        path: new_path,
    };
    diesel::replace_into(config)
        .values(&new_config)
        .execute(&mut conn)?;

    config.find(1).first(&mut conn)
}
