// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::process::{Command, Stdio};

mod commands;
mod db;
mod services;
mod repositories;

fn main() {
    Command::new("./binaries/puppeteer-server-win.exe")
        .stdout(Stdio::null())
        .stderr(Stdio::null())
        .spawn()
        .expect("Failed to start external module");
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            commands::profile_commands::read_total_profiles,
            commands::profile_commands::create_profile,
            commands::profile_commands::read_profile,
            commands::profile_commands::read_profiles,
            commands::profile_commands::update_profile,
            commands::profile_commands::delete_profiles,
            commands::config_commands::get_config,
            commands::config_commands::set_config,
            commands::script_commands::read_total_scripts,
            commands::script_commands::create_script,
            commands::script_commands::read_script,
            commands::script_commands::read_scripts,
            commands::script_commands::update_script,
            commands::script_commands::delete_scripts
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

