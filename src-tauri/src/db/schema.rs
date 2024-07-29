diesel::table! {
    profile (id) {
        id -> Text,
        #[max_length = 100]
        name -> Varchar,
        path -> Text,
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
