// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod commands;
mod db;
mod services;
mod repositories;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            commands::profile_commands::read_total_profiles,
            commands::profile_commands::create_profile,
            commands::profile_commands::read_profile,
            commands::profile_commands::read_profiles,
            commands::profile_commands::update_profile,
            commands::profile_commands::delete_profiles,
            commands::config_commands::get_config,
            commands::config_commands::set_config
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

