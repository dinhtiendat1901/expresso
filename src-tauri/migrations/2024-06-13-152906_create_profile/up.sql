-- Your SQL goes here
CREATE TABLE profile
(
    id           INT AUTO_INCREMENT PRIMARY KEY,
    name         VARCHAR(100),
    description  VARCHAR(100),
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
