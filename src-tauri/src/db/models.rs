use chrono::NaiveDateTime;
use diesel::{AsChangeset, Insertable, Queryable};
use serde::{Deserialize, Serialize};

use super::schema::profile;

#[derive(Queryable, Insertable, AsChangeset, Serialize, Deserialize, Debug)]
#[table_name = "profile"]
pub struct Profile {
    pub id: i32,
    pub name: Option<String>,
    pub description: Option<String>,
    pub createdDate: Option<NaiveDateTime>,
}

// Struct used for creating new profiles
#[derive(Insertable, Serialize, Deserialize)]
#[table_name = "profile"]
pub struct NewProfile {
    pub name: Option<String>,
    pub description: Option<String>,
}

// Struct used for updating profiles
#[derive(AsChangeset, Serialize, Deserialize)]
#[table_name = "profile"]
pub struct UpdateProfile {
    pub name: Option<String>,
    pub description: Option<String>,
}
