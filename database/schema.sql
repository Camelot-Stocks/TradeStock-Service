DROP DATABASE IF EXISTS robinhood;

CREATE DATABASE robinhood;

\c robinhood;

CREATE TABLE IF NOT EXISTS users (
 id SERIAL PRIMARY KEY,
 name VARCHAR (50) NOT NULL,
 budget FLOAT(2) NOT NULL,
 birthdate TIMESTAMPTZ NOT NULL,
 phone_number VARCHAR (14) NOT NULL,
 street VARCHAR(30) NOT NULL,
 city VARCHAR(30) NOT NULL,
 state VARCHAR(30) NOT NULL,
 zip VARCHAR(5) NOT NULL
);

CREATE TABLE IF NOT EXISTS stocks (
 id SERIAL PRIMARY KEY,
 company VARCHAR (50) NOT NULL,
 ticker VARCHAR (50) NOT NULL,
 price FLOAT(2) NOT NULL,
 ceo VARCHAR (30) NOT NULL,
 employees INTEGER NOT NULL,
 founded TIMESTAMPTZ NOT NULL
);

CREATE TABLE IF NOT EXISTS users_stocks (
 id SERIAL PRIMARY KEY,
 stock_id INTEGER NOT NULL,
 user_id INTEGER NOT NULL,
 quantity INTEGER NOT NULL,
 FOREIGN KEY (user_id) REFERENCES users (id),
 FOREIGN KEY (stock_id) REFERENCES stocks (id)
);

CREATE TABLE IF NOT EXISTS transactions (
 id SERIAL PRIMARY KEY,
 stock_id INTEGER NOT NULL,
 user_id INTEGER NOT NULL,
 type VARCHAR NOT NULL,
 date TIMESTAMPTZ NOT NULL,
 quantity INTEGER NOT NULL,
 total_price FLOAT (2) NOT NULL,
 price_per_share FLOAT (2) NOT NULL,
 FOREIGN KEY (user_id) REFERENCES users (id),
 FOREIGN KEY (stock_id) REFERENCES stocks (id)
);
