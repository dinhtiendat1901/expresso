-- Your SQL goes here
CREATE TABLE Profile
(
    id          INT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(100),
    description VARCHAR(100),
    createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
