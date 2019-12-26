/* eslint-disable no-confusing-arrow */
const faker = require('faker');
const Pg = require('./psql.models.js');

const company = () => faker.company.companyName();
const price = () => Number((Math.random() * 1000).toFixed(2));
const ceo = () => faker.name.findName();
const employees = () => Math.floor(Math.random() * 100000);
const founded = () => faker.date.between('1945-01-01', '2010-01-01');
const ticker = () => {
  let tickerStr = '';
  const size = Math.floor(Math.random() * (5 - 1) + 1);
  const randNum = () => Math.floor(Math.random() * (91 - 65) + 65);
  while (tickerStr.length < size) {
    tickerStr += String.fromCharCode(randNum());
  }
  return tickerStr;
};

// stocks table
// id SERIAL PRIMARY KEY,
// company VARCHAR (10) NOT NULL,
// ticker VARCHAR (50) UNIQUE NOT NULL,
// price FLOAT(2) NOT NULL,
// ceo VARCHAR (10) NOT NULL,
// employees INTEGER NOT NULL,
// founded TIMESTAMPTZ NOT NULL

const insertStocks = (num) => {
  const stockPromises = [];
  for (let i = 0; i < num; i++) {
    stockPromises.push(
      Pg.seedStock({
        company: company(),
        ticker: ticker(),
        price: price(),
        ceo: ceo(),
        employees: employees(),
        founded: founded(),
      }),
    );
  }
  Promise.all(stockPromises)
    .then(() => console.log('Stock seed data created'))
    .catch((err) => console.log('Error seeding data'));
};

// insertStocks(1);

const name = () => faker.name.findName();
const budget = () => Number((Math.random() * 500000).toFixed(2));
const birthdate = () => faker.date.between('1945-01-01', '2002-01-01');
const phoneNumber = () => faker.phone.phoneNumberFormat();
const street = () => faker.address.streetAddress();
const city = () => faker.address.city();
const state = () => faker.address.state();
const zip = () => faker.address.zipCode().slice(0, 5);
const quantity = () => Math.ceil(Math.random() * 100);
const makeStockAmount = () => Math.ceil(Math.random() * 10);

// users table
//  id SERIAL PRIMARY KEY,
//  name VARCHAR (50) NOT NULL,
//  budget FLOAT(2) NOT NULL,
//  birthdate TIMESTAMPTZ NOT NULL,
//  phone_number VARCHAR (14) NOT NULL,
//  street VARCHAR(30) NOT NULL,
//  city VARCHAR(30) NOT NULL,
//  state VARCHAR(30) NOT NULL,
//  zip INTEGER NOT NULL

const insertUser = (num) => {
  const userPromises = [];
  for (let i = 0; i < num; i++) {
    if (i % 10000 === 0) {
      console.log(i);
    }
    userPromises.push(
      Pg.seedUser({
        name: name(),
        budget: budget(),
        birthdate: birthdate(),
        phone_number: phoneNumber(),
        street: street(),
        city: city(),
        state: state(),
        zip: zip(),
      }),
    );
  }
  Promise.all(userPromises)
    .then(() => console.log('User seed data created'))
    .catch((err) => console.log('Error seeding data'));
};

insertUser(10);

const date = () => faker.date.between('2013-04-18', '2020-01-01');
const randNumUser = () => Math.floor(Math.random() * (100 - 1) + 1);
const randNumStock = () => Math.floor(Math.random() * (100 - 1) + 1);
const type = () => Math.random() < 0.5 ? 'buy' : 'sell';

// transations table
// stock_id INTEGER NOT NULL,
//  user_id INTEGER NOT NULL,
//  type VARCHAR NOT NULL,
//  date TIMESTAMPTZ NOT NULL,
//  quantity INTEGER NOT NULL,
//  total_price FLOAT (2) NOT NULL,
//  price_per_share FLOAT (2) NOT NULL,

const insertTransaction = (num) => {
  const tradePromises = [];
  for (let i = 0; i < num; i++) {
    const stockAmount = makeStockAmount();
    const pps = price();
    const total = pps * stockAmount;
    tradePromises.push(
      Mongo.insetTransactions({
        stock_id: randNumStock(),
        user_id: randNumUser(),
        type: type(),
        date: date(),
        quantity: stockAmount,
        total_price: total,
        price_per_share: pps,
      }),
    );
  }
  Promise.all(tradePromises)
    .then(() => console.log('Stock seed data created'))
    .catch((err) => console.log('Error seeding data'));
};


// users_stocks table
// id SERIAL PRIMARY KEY,
// stock_id INTEGER NOT NULL,
// user_id INTEGER NOT NULL,
// quantity INTEGER NOT NULL,
// FOREIGN KEY (user_id) REFERENCES users (id),
// FOREIGN KEY (stock_id) REFERENCES stocks (id)

// {
//   stock_id: randNumStock(),
//   user_id: randNumUser(),
//   quantity: makeStockAmount,
// }
