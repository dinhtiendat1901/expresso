use diesel::{AsChangeset, Insertable, Queryable};
use serde::{Deserialize, Serialize};

use super::schema::config;
use super::schema::profile;
use super::schema::profile_group;
use super::schema::run_status;
use super::schema::script;

#[derive(Queryable, Insertable, AsChangeset, Serialize, Deserialize, Debug)]
#[diesel(table_name = profile)]
pub struct Profile {
    pub id: String,
    pub name: String,
    pub path: String,
    pub group_id: String,
}

// Struct used for creating new profiles
#[derive(Insertable, Serialize, Deserialize)]
#[diesel(table_name = profile)]
pub struct NewProfile {
    pub name: String,
    pub path: String,
    pub group_id: String,
}

// Struct used for updating profiles
#[derive(AsChangeset, Serialize, Deserialize)]
#[diesel(table_name = profile)]
pub struct UpdateProfile {
    pub name: Option<String>,
    pub path: Option<String>,
    pub group_id: Option<String>,
}

#[derive(Queryable, Serialize, Deserialize, Debug)]
pub struct ProfileWithGroup {
    pub id: String,
    pub name: String,
    pub path: String,
    pub profile_group: ProfileGroup,
    pub run_status_by_profiles: Vec<RunStatusByProfile>,
    pub success: i32,
    pub fail: i32,
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

#[derive(Queryable, Insertable, AsChangeset, Serialize, Deserialize, Debug)]
#[diesel(table_name = profile_group)]
pub struct ProfileGroup {
    pub id: String,
    pub name: String,
    pub color: String,
}

// Struct used for creating new profile groups
#[derive(Insertable, Serialize, Deserialize)]
#[diesel(table_name = profile_group)]
pub struct NewProfileGroup {
    pub name: String,
    pub color: String,
}

// Struct used for updating profile groups
#[derive(AsChangeset, Serialize, Deserialize)]
#[diesel(table_name = profile_group)]
pub struct UpdateProfileGroup {
    pub name: Option<String>,
    pub color: Option<String>,
}

#[derive(Queryable, Insertable, AsChangeset, Serialize, Deserialize, Debug)]
#[diesel(table_name = run_status)]
pub struct RunStatus {
    pub profile_id: String,
    pub script_id: String,
    pub status: i32,
    pub detail: Option<String>,
}

#[derive(Insertable, Serialize, Deserialize)]
#[diesel(table_name = run_status)]
pub struct NewRunStatus {
    pub profile_id: String,
    pub script_id: String,
    pub status: i32,
    pub detail: Option<String>,
}

#[derive(AsChangeset, Serialize, Deserialize)]
#[diesel(table_name = run_status)]
pub struct UpdateRunStatus {
    pub status: i32,
    pub detail: Option<String>,
}

#[derive(Queryable, Serialize, Deserialize, Debug)]
pub struct RunStatusByProfile {
    pub script_name: String,
    pub status: i32,
    pub detail: Option<String>,
}
