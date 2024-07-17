diesel::table! {
    profile (id) {
        id -> Integer,
        #[max_length = 100]
        name -> Nullable<Varchar>,
        #[max_length = 100]
        description -> Nullable<Varchar>,
        created_date -> Nullable<Timestamp>,
        path -> Nullable<Text>,
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
        id -> Integer,
        #[max_length = 100]
        name -> Varchar,
        path -> Text,
    }
}