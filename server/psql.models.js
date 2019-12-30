const promise = require('bluebird');
const { Pool } = require('pg');

const options = {
  promiseLib: promise,
};
const pgp = require('pg-promise')(options);

const connectionString = 'postgres://localhost:5432/robinhood';
const db = pgp(connectionString);

const pool = new Pool({
  host: 'localhost',
  database: 'robinhood',
  user: 'arashabbasi',
  // max: 20,
  // idleTimeoutMillis: 30000,
  // connectionTimeoutMillis: 2000,
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  client.query('SELECT NOW()', (err, result) => {
    release();
    if (err) {
      return console.error('Error executing query', err.stack);
    }
    console.log(result.rows);
  });
});

addUser = (callback, data) => {
  const query = 'insert into users(name, budget, birthdate, phone_number, street, city, state, zip) values($1, $2, $3, $4, $5, $6, $7, $8)';
  const queryVal = [data.name, data.budget, data.birthdate, data.phone_number, data.street, data.city, data.state, data.zip];
  db.none(query, queryVal)
    .then(() => {
      callback(null, 'User added to DB');
    })
    .catch((err) => callback(err));
};

addStock = (callback, data) => {
  const query = 'insert into stocks(company, ticker, price, ceo, employees, founded) values($1, $2, $3, $4, $5, $6)';
  const queryVal = [data.company, data.ticker, data.price, data.ceo, data.employees, data.founded];
  db.none(query, queryVal)
    .then(() => {
      callback(null, 'Stock added to DB');
    })
    .catch((err) => callback(err));
};

addTransaction = (callback, data) => {
  const query = 'insert into transactions(stock_id, user_id, type, date, quantity, total_price, price_per_share) values($1, $2, $3, $4, $5, $6, $7)';
  const queryVal = [data.stock_id, data.user_id, data.type, data.date, data.quantity, data.total_price, data.price_per_share];
  db.none(query, queryVal)
    .then(() => {
      callback(null, 'Transaction added to DB');
    })
    .catch((err) => callback(err));
};

addUsersStocks = (callback, data) => {
  const query = 'insert into users_stocks(stock_id, user_id, quantity) values($1, $2, $3)';
  const queryVal = [data.stock_id, data.user_id, data.quantity];
  db.none(query, queryVal)
    .then(() => {
      callback(null, 'UserStock added to DB');
    })
    .catch((err) => callback(err));
};

seedUser = (data) => {
  const query = 'insert into users(name, budget, birthdate, phone_number, street, city, state, zip) values($1, $2, $3, $4, $5, $6, $7, $8)';
  const queryVal = [data.name, data.budget, data.birthdate, data.phone_number, data.street, data.city, data.state, data.zip];
  db.none(query, queryVal)
    .then(() => {
      // console.log('User added to DB');
    })
    .catch((err) => {
      // console.log(err);
    });
};

seedStock = (data) => {
  const query = 'insert into stocks(company, ticker, price, ceo, employees, founded) values($1, $2, $3, $4, $5, $6)';
  const queryVal = [data.company, data.ticker, data.price, data.ceo, data.employees, data.founded];
  db.none(query, queryVal)
    .then(() => {
      console.log('Stock added to DB');
    })
    .catch((err) => {
      console.log(err);
    });
};

seedTransaction = (data) => {
  const query = 'insert into transactions(stock_id, user_id, type, date, quantity, total_price, price_per_share) values($1, $2, $3, $4, $5, $6, $7)';
  const queryVal = [data.stock_id, data.user_id, data.type, data.date, data.quantity, data.total_price, data.price_per_share];
  db.none(query, queryVal)
    .then(() => {
      console.log('Transaction added to DB');
    })
    .catch((err) => {
      console.log(err);
    });
};

seedUserStock = (data) => {
  const query = 'insert into users_stocks(stock_id, user_id, quantity) values($1, $2, $3)';
  const queryVal = [data.stock_id, data.user_id, data.quantity];
  db.none(query, queryVal)
    .then(() => {
      console.log('UserStock added to DB');
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  addUser,
  addStock,
  addTransaction,
  addUsersStocks,
  seedUser,
  seedStock,
  seedTransaction,
  seedUserStock,
};
