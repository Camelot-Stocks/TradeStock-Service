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
const zip = () => faker.address.zipCode();
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
const randNumUser = () => Math.floor(Math.random() * (100 - 1) + 1);
const randNumStock = () => Math.floor(Math.random() * (100 - 1) + 1);
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

stockGen();

// import stocks command:
// mongoimport --db=robinhood --collection=stocks --type=csv --columnsHaveTypes --fields="_id.auto(),company.string(),ticker.string(),price.auto(),ceo.string(),employees.auto(),founded.auto()" --file=/Users/arashabbasi/hackreactor/SDC/Robinhood-TradeStock/mdb.stocks.csv
