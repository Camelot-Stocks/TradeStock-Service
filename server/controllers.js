const Mongo = require('./mongo.models.js');

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
};
