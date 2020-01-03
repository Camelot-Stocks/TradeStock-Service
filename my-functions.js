/* eslint-disable strict */
/* eslint-disable no-param-reassign */

'use strict';

const faker = require('faker');

function generateRandomUserId(userContext, events, done) {
  const userId = randNumUser;
  // add variables to virtual user's context:
  userContext.vars.userId = userId;
  // continue with executing the scenario:
  return done();
}

module.exports = {
  generateRandomUserId,
};
