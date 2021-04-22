CREATE DATABASE dnodb;
CREATE EXTENSION "uuid-ossp";
CREATE TABLE users (
  user_uuid UUID NOT NULL PRIMARY KEY,
  user_email VARCHAR(150) NOT NULL,
  user_password VARCHAR(255),
  user_phone INT,
  user_first_name VARCHAR(50) NOT NULL,
  user_last_name VARCHAR(50),
  user_nickname VARCHAR(50) NOT NULL,
  user_image VARCHAR(255),
  user_gender VARCHAR(6),
  user_date_of_birth DATE
);