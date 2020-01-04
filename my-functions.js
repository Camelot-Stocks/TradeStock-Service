/* eslint-disable camelcase */
/* eslint-disable strict */
/* eslint-disable no-param-reassign */

'use strict';

const faker = require('faker');

// stock_id: randNumStock(),
// user_id: randNumUser(),
// type: type(),
// date: date().toISOString(),
// quantity: stockAmount,
// total_price: total,
// price_per_share: pps,

function generateRandomData(userContext, events, done) {
  // generate data with Faker:
  const stock_id = Math.floor(Math.random() * (500000 - 1) + 1);
  const user_id = Math.floor(Math.random() * (10000000 - 1) + 1);
  const type = Math.random() < 0.5 ? 'buy' : 'sell';
  const date = faker.date.between('2013-04-18', '2020-01-01').toISOString();
  const quantity = Math.ceil(Math.random() * 10);
  const total_price = (Number((Math.random() * 1000).toFixed(2)) * quantity);
  const price_per_share = (total_price / quantity);
  // add variables to virtual user's context:
  userContext.vars.stock_id = stock_id;
  userContext.vars.user_id = user_id;
  userContext.vars.type = type;
  userContext.vars.date = date;
  userContext.vars.quantity = quantity;
  userContext.vars.total_price = total_price;
  userContext.vars.price_per_share = price_per_share;
  // continue with executing the scenario:
  return done();
}

module.exports = {
  generateRandomData,
};
