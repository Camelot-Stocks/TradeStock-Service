/* eslint-disable no-confusing-arrow */
const faker = require('faker');
const fs = require('fs');
const csvWriter = require('csv-write-stream');

const writer = csvWriter();
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

// insertStocks(90);

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

const insertUser = (num) => {
  const userPromises = [];
  for (let i = 0; i < num; i++) {
    // if (i % 10000 === 0) {
    //   console.log(i);
    // }
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

// insertUser(90);

const date = () => faker.date.between('2013-04-18', '2020-01-01');
const randNumUser = () => Math.floor(Math.random() * (10000000 - 1) + 1);
const randNumStock = () => Math.floor(Math.random() * (500000 - 1) + 1);
const type = () => Math.random() < 0.5 ? 'buy' : 'sell';

const insertTransaction = (num) => {
  const tradePromises = [];
  for (let i = 0; i < num; i++) {
    const stockAmount = makeStockAmount();
    const pps = price();
    const total = pps * stockAmount;
    tradePromises.push(
      Pg.seedTransaction({
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
    .then(() => console.log('Transaction seed data created'))
    .catch((err) => console.log('Error seeding data'));
};

// insertTransaction(10);

const insertUserStock = (num) => {
  const userStockPromises = [];
  for (let i = 0; i < num; i++) {
    userStockPromises.push(
      Pg.seedUserStock({
        stock_id: randNumStock(),
        user_id: randNumUser(),
        quantity: makeStockAmount(),
      }),
    );
  }
  Promise.all(userStockPromises)
    .then(() => console.log('Transaction seed data created'))
    .catch((err) => console.log('Error seeding data'));
};

// insertUserStock(10);

const stockGen = () => {
  writer.pipe(fs.createWriteStream('pg.stocks.csv'));
  for (let i = 0; i < 500000; i++) {
    writer.write({
      id: i + 1,
      company: company(),
      ticker: ticker(),
      price: price(),
      ceo: ceo(),
      employees: employees(),
      founded: founded().toISOString(),
    });
  }
  writer.end();
  console.log('Stocks done!');
};

const userGen = () => {
  writer.pipe(fs.createWriteStream('pg.users.csv'));
  for (let i = 0; i < 10000000; i++) {
    writer.write({
      id: i + 1,
      name: name(),
      budget: budget(),
      birthdate: birthdate().toISOString(),
      phone_number: phoneNumber(),
      street: street(),
      city: city(),
      state: state(),
      zip: zip(),
    });
  }
  writer.end();
  console.log('Users done!');
};

const userStockGen = () => {
  writer.pipe(fs.createWriteStream('pg.usersStocks.csv'));
  for (let i = 0; i < 10000000; i++) {
    writer.write({
      id: i + 1,
      stock_id: randNumStock(),
      user_id: randNumUser(),
      quantity: makeStockAmount(),
    });
  }
  writer.end();
  console.log('Users-Stocks done!');
};

// stockGen();
// userGen();
