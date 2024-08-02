diesel::table! {
    profile (id) {
        id -> Text,
        #[max_length = 100]
        name -> Varchar,
        path -> Text,
        group_id -> Text,
    }
}

diesel::table! {
    profile_group (id) {
        id -> Text,
        #[max_length = 100]
        name -> Varchar,
        #[max_length = 20]
        color -> Varchar,
    }
}

diesel::table! {
    config (id) {
        id -> Integer,
        path -> Nullable<Text>,
    }
}

diesel::table! {
    script (id) {
        id -> Text,
        #[max_length = 100]
        name -> Varchar,
        path -> Text,
    }
}

diesel::allow_tables_to_appear_in_same_query!(profile, profile_group, script, run_status);

diesel::joinable!(profile -> profile_group (group_id));

diesel::table! {
    run_status (profile_id, script_id) {
        profile_id -> Text,
        script_id -> Text,
        status -> Integer,
    }
}

diesel::joinable!(run_status -> profile (profile_id));
diesel::joinable!(run_status -> script (script_id));
