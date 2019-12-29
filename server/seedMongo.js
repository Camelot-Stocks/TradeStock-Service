/* eslint-disable no-await-in-loop */
/* eslint-disable no-confusing-arrow */
const faker = require('faker');
const csvWriter = require('csv-write-stream');
const fs = require('fs');
const Mongo = require('./mongo.models.js');

const writer = csvWriter();

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
      Mongo.insertStock({
        id: i + 1,
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

// insertStocks(100);

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

const insertUserStock = (num) => {
  const userPromises = [];
  for (let i = 0; i < num; i++) {
    let qty = quantity();
    let stockAmount = makeStockAmount();
    userPromises.push(
      Mongo.insertUserStock({
        id: i + 1,
        name: name(),
        budget: budget(),
        birthdate: birthdate(),
        phoneNumber: phoneNumber(),
        street: street(),
        city: city(),
        state: state(),
        zip: zip(),
        stocks: [],
      }, stockAmount, qty),
    );
  }
  Promise.all(userPromises)
    .then(() => console.log('Stock seed data created'))
    .catch((err) => console.log('Error seeding data'));
};

// insertUserStock(100);
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
      Mongo.insetTransactions({
        id: i + 1,
        date: date(),
        stock_id: randNumStock(),
        type: type(),
        by_user: randNumUser(),
        quantity: stockAmount,
        price_per_share: pps,
        total_price: total,
      }),
    );
  }
  Promise.all(tradePromises)
    .then(() => console.log('Stock seed data created'))
    .catch((err) => console.log('Error seeding data'));
};

// insertTransaction(100);

const stockGen = () => {
  writer.pipe(fs.createWriteStream('mdb.stocks.csv'));
  for (let i = 0; i < 500000; i++) {
    writer.write({
      _id: i + 1,
      company: company(),
      ticker: ticker(),
      price: price(),
      ceo: ceo(),
      employees: employees(),
      founded: founded().toISOString().slice(0, 4),
    });
  }
  writer.end();
  console.log('Stocks done!');
};

// stockGen();

// import stocks command:
// mongoimport --db=robinhood --collection=stocks --type=csv --columnsHaveTypes --fields="_id.auto(),company.string(),ticker.string(),price.auto(),ceo.string(),employees.auto(),founded.auto()" --file=/Users/arashabbasi/hackreactor/SDC/Robinhood-TradeStock/mdb.stocks.csv

const userGen = () => {
  writer.pipe(fs.createWriteStream('mdb.users.csv', { flags: 'a' }));
  let counter = 8000000;
  for (let i = 0; i <= 2000000; i++) {
    const stocksArr = [];
    const qty = Math.ceil(Math.random() * 10);
    for (let j = 0; j < qty; j++) {
      const stockObj = { stock: randNumStock(), quantity: quantity() };
      stocksArr.push(stockObj);
    }
    writer.write({
      _id: counter++,
      name: name(),
      budget: budget(),
      birthdate: birthdate().toISOString(),
      phoneNumber: phoneNumber(),
      street: street(),
      city: city(),
      state: state(),
      zip: zip(),
      stocks: JSON.stringify(stocksArr),
    });
    if (i % 100000 === 0) {
      console.log('At: ', i);
    }
  }
  writer.end();
  console.log('Users done!');
};

// userGen();

// mongoimport --db=robinhood --collection=users --type=csv --columnsHaveTypes --fields="_id.auto(), name.string(), budget.auto(),birthdate.auto(), phoneNumber.string(),street.string(),city.string(), state.string(), zip.auto(), stocks.auto()" --file=/Users/arashabbasi/hackreactor/SDC/Robinhood-TradeStock/mdb.users.csv

const transactionGen = () => {
  writer.pipe(fs.createWriteStream('mdb.transactions.csv', { flags: 'a' }));
  let counter = 0;
  for (let i = 0; i < 10000000; i++) {
    const stockAmount = makeStockAmount();
    const pps = price();
    const total = (pps * stockAmount).toFixed(2);
    writer.write({
      _id: counter++,
      date: date().toISOString(),
      stock_id: randNumStock(),
      type: type(),
      by_user: randNumUser(),
      quantity: stockAmount,
      price_per_share: pps,
      total_price: total,
    });
  }
  writer.end();
  console.log('Transactions done!');
};

// transactionGen();

// import transactions command:
// mongoimport --db=robinhood --collection=transactions --type=csv --columnsHaveTypes --fields="_id.auto(),date.auto(),stock_id.auto(),type.string(),by_user.auto(),quantity.auto(),price_per_share.auto(), total_price.auto()" --file=/Users/arashabbasi/hackreactor/SDC/Robinhood-TradeStock/mdb.transactions.csv
