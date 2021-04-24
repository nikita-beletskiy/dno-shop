CREATE DATABASE dnodb;
CREATE EXTENSION "uuid-ossp";
CREATE TABLE users (
  user_email VARCHAR(100) NOT NULL UNIQUE PRIMARY KEY,
  user_password VARCHAR(255) NOT NULL,
  user_phone INT UNIQUE,
  user_first_name VARCHAR(50) NOT NULL,
  user_last_name VARCHAR(50),
  user_nickname VARCHAR(50) NOT NULL UNIQUE,
  user_image VARCHAR(255),
  user_gender VARCHAR(6),
  user_date_of_birth DATE
);
INSERT INTO users (
    user_email,
    user_password,
    user_first_name,
    user_nickname
  )
VALUES ('test@test.com', 'password', 'John', 'Johnny');