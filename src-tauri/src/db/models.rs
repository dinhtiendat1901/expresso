use chrono::NaiveDateTime;
use diesel::{AsChangeset, Insertable, Queryable};
use serde::{Deserialize, Serialize};

use super::schema::config;
use super::schema::profile;

#[derive(Queryable, Insertable, AsChangeset, Serialize, Deserialize, Debug)]
#[diesel(table_name = profile)]
pub struct Profile {
    pub id: i32,
    pub name: Option<String>,
    pub description: Option<String>,
    pub created_date: Option<NaiveDateTime>,
    pub path: Option<String>,
}

// Struct used for creating new profiles
#[derive(Insertable, Serialize, Deserialize)]
#[diesel(table_name = profile)]
pub struct NewProfile {
    pub name: Option<String>,
    pub description: Option<String>,
    pub path: Option<String>,
}

// Struct used for updating profiles
#[derive(AsChangeset, Serialize, Deserialize)]
#[diesel(table_name = profile)]
pub struct UpdateProfile {
    pub name: Option<String>,
    pub description: Option<String>,
    pub path: Option<String>,
}

#[derive(Queryable, Insertable, AsChangeset, Serialize, Deserialize, Debug)]
#[diesel(table_name = config)]
pub struct Config {
    pub id: i32,
    pub path: Option<String>,
}
