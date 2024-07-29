use diesel::{AsChangeset, Insertable, Queryable};
use serde::{Deserialize, Serialize};

use super::schema::config;
use super::schema::profile;
use super::schema::script;

#[derive(Queryable, Insertable, AsChangeset, Serialize, Deserialize, Debug)]
#[diesel(table_name = profile)]
pub struct Profile {
    pub id: String,
    pub name: String,
    pub path: String,
}

// Struct used for creating new profiles
#[derive(Insertable, Serialize, Deserialize)]
#[diesel(table_name = profile)]
pub struct NewProfile {
    pub name: String,
    pub path: String,
}

// Struct used for updating profiles
#[derive(AsChangeset, Serialize, Deserialize)]
#[diesel(table_name = profile)]
pub struct UpdateProfile {
    pub name: Option<String>,
    pub path: Option<String>,
}

#[derive(Queryable, Insertable, AsChangeset, Serialize, Deserialize, Debug)]
#[diesel(table_name = config)]
pub struct Config {
    pub id: i32,
    pub path: Option<String>,
}

#[derive(Queryable, Insertable, AsChangeset, Serialize, Deserialize, Debug)]
#[diesel(table_name = script)]
pub struct Script {
    pub id: String,
    pub name: String,
    pub path: String,
}

// Struct used for creating new scripts
#[derive(Insertable, Serialize, Deserialize)]
#[diesel(table_name = script)]
pub struct NewScript {
    pub name: String,
    pub path: String,
}

// Struct used for updating scripts
#[derive(AsChangeset, Serialize, Deserialize)]
#[diesel(table_name = script)]
pub struct UpdateScript {
    pub name: Option<String>,
    pub path: Option<String>,
}
