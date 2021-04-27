CREATE DATABASE dnodb;
CREATE EXTENSION "uuid-ossp";
CREATE TABLE users (
  email VARCHAR(100) NOT NULL UNIQUE PRIMARY KEY,
  password VARCHAR(255) NOT NULL,
  phone INT UNIQUE,
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(50),
  nickname VARCHAR(50) NOT NULL UNIQUE,
  image VARCHAR(255),
  gender VARCHAR(6),
  dateOfBirth DATE
);
INSERT INTO users (
    user_email,
    user_password,
    user_first_name,
    user_nickname
  )
VALUES ('test@test.com', 'password', 'John', 'Johnny');