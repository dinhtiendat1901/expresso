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

diesel::allow_tables_to_appear_in_same_query!(profile, profile_group,);

diesel::joinable!(profile -> profile_group (group_id));
