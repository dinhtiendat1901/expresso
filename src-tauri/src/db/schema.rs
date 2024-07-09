diesel::table! {
    profile (id) {
        id -> Integer,
        #[max_length = 100]
        name -> Nullable<Varchar>,
        #[max_length = 100]
        description -> Nullable<Varchar>,
        created_date -> Nullable<Timestamp>,
    }
}

diesel::table! {
    config (id) {
        id -> Integer,
        path -> Nullable<Text>,
    }
}