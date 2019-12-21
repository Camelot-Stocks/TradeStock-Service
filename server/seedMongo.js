const faker = require('faker');
const Mongo = require('./mongo.models.js');

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
const phoneNumber = () => faker.phone.phoneNumber();
const street = () => faker.address.streetAddress();
const city = () => faker.address.city();
const state = () => faker.address.state();
const zip = () => faker.address.zipCode();
const quantity = () => Math.floor(Math.random() * 100);
const makeStockAmount = () => Math.floor(Math.random() * 100);

const insertUsersStock = (num) => {
  const userPromises = [];
  for (let i = 0; i < num; i++) {
    userPromises.push(
      Mongo.insertUserStock({
        name: name(),
        budget: budget(),
        birthdate: birthdate(),
        phoneNumber: phoneNumber(),
        street: street(),
        city: city(),
        state: state(),
        zip: zip(),
        stocks: [],
      }),
    );
  }
  Promise.all(userPromises)
    .then(() => console.log('Stock seed data created'))
    .catch((err) => console.log('Error seeding data'));
};

insertUsersStock(1);
