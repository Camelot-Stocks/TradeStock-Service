DROP DATABASE IF EXISTS robinhood;

CREATE DATABASE robinhood;

\c robinhood;

CREATE TABLE IF NOT EXISTS users (
 user_id SERIAL PRIMARY KEY,
 user_name VARCHAR (50) NOT NULL,
 budget FLOAT(2) NOT NULL,
 birthdate DATE NOT NULL,
 phone_number VARCHAR (10) NOT NULL,
 street VARCHAR(30) NOT NULL,
 city VARCHAR(30) NOT NULL,
 state VARCHAR(30) NOT NULL,
 zip INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS stocks (
 stock_id SERIAL PRIMARY KEY,
 company VARCHAR (10) NOT NULL,
 ticker VARCHAR (50) UNIQUE NOT NULL,
 price FLOAT(2) NOT NULL,
 ceo VARCHAR (10) NOT NULL,
 employees INTEGER NOT NULL,
 founded DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS users_stocks (
 stock_id INTEGER NOT NULL,
 user_id INTEGER NOT NULL,
 quantity INTEGER NOT NULL,
 FOREIGN KEY (user_id) REFERENCES users (user_id),
 FOREIGN KEY (stock_id) REFERENCES stocks (stock_id)
);

CREATE TABLE IF NOT EXISTS transactions (
 stock_id INTEGER NOT NULL,
 user_id INTEGER NOT NULL,
 type VARCHAR NOT NULL,
 date DATE NOT NULL,
 quantity INTEGER NOT NULL,
 total_price FLOAT (2) NOT NULL,
 price_per_share FLOAT (2) NOT NULL,
 FOREIGN KEY (user_id) REFERENCES users (user_id),
 FOREIGN KEY (stock_id) REFERENCES stocks (stock_id)
);
