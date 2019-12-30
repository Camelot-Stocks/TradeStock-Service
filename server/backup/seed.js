const { Users, Stocks } = require('./database.js');

const makeDollarAmount = () => Number((Math.random() * 1000).toFixed(2));

const makeStockAmount = () => Math.floor(Math.random() * 100);

const makeTickerSymbol = () => {
  let ticker = '';
  const size = Math.floor(Math.random() * (5 - 1) + 1);
  const randNum = () => Math.floor(Math.random() * (91 - 65) + 65);

  while (ticker.length < size) {
    ticker += String.fromCharCode(randNum());
  }

  return ticker;
};

const insertStocks = (num) => {
  const stockPromises = [];
  for (let i = 0; i < num; i++) {
    stockPromises.push(
      Stocks.create({
        ticker: makeTickerSymbol(),
        price: makeDollarAmount(),
      }),
    );
  }
  Promise.all(stockPromises)
    .then(() => console.log('Stock seed data created'))
    .catch((err) => console.log('Error seeding data'));
};

const insertUsers = (num) => {
  const userPromises = [];
  for (let i = 0; i < num - 1; i++) {
    userPromises.push(
      Users.create({
        funds: makeDollarAmount(),
        shares: makeStockAmount(),
      }),
    );
  }
  userPromises.push(
    Users.create({
      funds: 0,
      shares: 0,
    }),
  );
  Promise.all(userPromises)
    .then(() => console.log('User seed data created'))
    .catch((err) => console.log('Error seeding data'));
};

insertStocks(100);
insertUsers(20);
