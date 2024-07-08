CREATE TABLE profile
(
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    name         VARCHAR(100),
    description  VARCHAR(100),
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
