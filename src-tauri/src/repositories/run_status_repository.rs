use diesel::prelude::*;
use diesel::result::Error;

use crate::db::connection::establish_connection;
use crate::db::models::{NewRunStatus, RunStatus};
use crate::db::schema::run_status;

pub fn batch_import_run_status(run_status_list: Vec<NewRunStatus>) -> Result<usize, Error> {
    let conn = &mut establish_connection();
    conn.transaction::<_, Error, _>(|conn| {
        let mut total_processed = 0;

        for new_status in run_status_list {
            let existing_status = run_status::table
                .filter(run_status::profile_id.eq(&new_status.profile_id))
                .filter(run_status::script_id.eq(&new_status.script_id))
                .first::<RunStatus>(conn)
                .optional()?;

            match existing_status {
                Some(mut status) => {
                    let profile_id = status.profile_id.clone();
                    let script_id = status.script_id.clone();
                    status.status = new_status.status;
                    status.detail = new_status.detail.clone();
                    diesel::update(run_status::table.find((profile_id, script_id)))
                        .set(&status)
                        .execute(conn)?;
                }
                None => {
                    diesel::insert_into(run_status::table)
                        .values(&new_status)
                        .execute(conn)?;
                }
            }

            total_processed += 1;
        }

        Ok(total_processed)
    })
}

pub fn delete_run_status_by_profile_ids(profile_ids: Vec<String>) -> Result<usize, Error> {
    let conn = &mut establish_connection();
    diesel::delete(run_status::table.filter(run_status::profile_id.eq_any(profile_ids)))
        .execute(conn)
}

pub fn delete_run_status_by_script_ids(script_ids: Vec<String>) -> Result<usize, Error> {
    let conn = &mut establish_connection();
    diesel::delete(run_status::table.filter(run_status::script_id.eq_any(script_ids))).execute(conn)
}
