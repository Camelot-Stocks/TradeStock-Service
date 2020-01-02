const Mongo = require('./mongo.models.js');
const PG = require('./psql.models.js');

module.exports = {
  addMongoUser: (req, res) => {
    Mongo.addUser((err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(data);
      }
    }, req.body);
  },
  addMongoStock: (req, res) => {
    Mongo.addStock((err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(data);
      }
    }, req.body);
  },
  addMongoTransaction: (req, res) => {
    Mongo.addTransaction((err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(data);
      }
    }, req.body);
  },
  addMongoUserStock: (req, res) => {
    Mongo.addUserStock((err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(data);
      }
    }, req.body);
  },
  getMongoStocks: (req, res) => {
    Mongo.getStocks((err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  },
  addPgUser: (req, res) => {
    PG.addUser((err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(data);
      }
    }, req.body);
  },
  addPgStock: (req, res) => {
    PG.addStock((err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(data);
      }
    }, req.body);
  },
  addPgTransaction: (req, res) => {
    PG.addTransaction((err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(data);
      }
    }, req.body);
  },
  addPgUsersStock: (req, res) => {
    PG.addUsersStocks((err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(data);
      }
    }, req.body);
  },
  getPgStock: (stockId, res) => {
    PG.getStock((err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(data);
      }
    }, stockId);
  },
  getPgUser: (userId, res) => {
    PG.getUser((err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(data);
      }
    }, userId);
  },
  getPgAllStocks: (userId, res) => {
    PG.getUsersStocks((err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(data);
      }
    }, userId);
  },
  getPgUserTransactions: (userId, res) => {
    PG.getUsersTransactions((err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(data);
      }
    }, userId);
  },
};
