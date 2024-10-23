// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::os::windows::process::CommandExt;
use std::process::{Child, Command, Stdio};
use std::sync::{Arc, Mutex};

mod commands;
mod db;
mod repositories;
mod services;


const CREATE_NO_WINDOW: u32 = 0x08000000;

// Struct to manage a generic external process
struct ExternalProcess {
    process: Option<Child>,
}

impl ExternalProcess {
    fn new(command: &str, args: &[&str]) -> Self {
        let process = Command::new(command)
            .args(args)
            .creation_flags(CREATE_NO_WINDOW)
            .stdout(Stdio::null())
            .stderr(Stdio::null())
            .spawn()
            .expect(&format!("Failed to start {}", command));

        ExternalProcess { process: Some(process) }
    }

    fn kill(&mut self) {
        if let Some(mut process) = self.process.take() {
            match process.kill() {
                Ok(_) => {
                    println!("Process killed.");
                    let _ = process.wait(); // Ensure process has been terminated
                }
                Err(e) => eprintln!("Failed to kill process: {}", e),
            }
        }
    }
}


fn main() {
    let puppeteer_server = Arc::new(Mutex::new(ExternalProcess::new(
        "./binaries/puppeteer-server-win.exe",
        &[],
    )));

    let redis_server = Arc::new(Mutex::new(ExternalProcess::new(
        "./binaries/Redis-7.4.1-Windows-x64-cygwin/redis-server.exe",
        &["--port", "6379"],
    )));

    let puppeteer_server_clone = Arc::clone(&puppeteer_server);
    let redis_server_clone = Arc::clone(&redis_server);

    tauri::Builder::default().on_window_event(move |_window, event| {
        if let tauri::WindowEvent::CloseRequested { .. } = event {
            println!("Window close requested. Killing external processes...");
            {
                let mut server = puppeteer_server_clone.lock().unwrap();
                server.kill();
            }
            {
                let mut server = redis_server_clone.lock().unwrap();
                server.kill();
            }
        }
    })
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![
            commands::profile_commands::read_total_profiles,
            commands::profile_commands::create_profile,
            commands::profile_commands::read_profile,
            commands::profile_commands::read_profiles,
            commands::profile_commands::update_profile,
            commands::profile_commands::delete_profiles,
            commands::profile_commands::batch_import_profile,
            commands::config_commands::get_config,
            commands::config_commands::set_config,
            commands::script_commands::read_total_scripts,
            commands::script_commands::create_script,
            commands::script_commands::read_script,
            commands::script_commands::read_scripts,
            commands::script_commands::update_script,
            commands::script_commands::delete_scripts,
            commands::profile_group_commands::create_profile_group,
            commands::profile_group_commands::read_profile_group,
            commands::profile_group_commands::list_profile_groups,
            commands::profile_group_commands::read_total_profile_groups,
            commands::profile_group_commands::update_profile_group,
            commands::profile_group_commands::delete_profile_groups,
            commands::run_status_commands::batch_import_run_status,
            commands::run_status_commands::delete_run_status_by_profile_ids,
            commands::run_status_commands::delete_run_status_by_script_ids
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
