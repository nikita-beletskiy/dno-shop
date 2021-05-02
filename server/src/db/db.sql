-- General database setup
CREATE DATABASE dnodb;
CREATE EXTENSION "uuid-ossp";
-- Setup for users table
CREATE TABLE users (
  id UUID NOT NULL PRIMARY KEY,
  email VARCHAR(100) NOT NULL UNIQUE,
  password TEXT NOT NULL,
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(50) NOT NULL,
  nickname VARCHAR(20) UNIQUE,
  phone VARCHAR(10) UNIQUE,
  dateOfBirth DATE,
  gender VARCHAR(6),
  image TEXT,
  wishlist VARCHAR(36) [],
  cart VARCHAR(36) []
);
INSERT INTO users (
    id,
    email,
    password,
    firstName,
    lastName
  )
VALUES (
    uuid_generate_v4(),
    'test2@test.com',
    '7282bc4f49f8c51a710b3f4d442a2dcbe9e71deb0892d56a064f04111d82344d1181f51f5b5fd526fedc26f40798491d67bc441d53dda1f0b85cae4bdf5b588f.2329804b87c05311',
    'John',
    'Johnson'
  );
-- Setup for products table
CREATE TABLE products(
  id UUID NOT NULL PRIMARY KEY,
  category VARCHAR(50) NOT NULL,
  title VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  price MONEY NOT NULL,
  images TEXT [],
  quantity SMALLINT DEFAULT 0
);
INSERT INTO products (
    id,
    category,
    title,
    description,
    price,
    quantity
  )
VALUES (
    uuid_generate_v4(),
    'Computers',
    'Laptop',
    'Very powerful laptop',
    300,
    4
  );