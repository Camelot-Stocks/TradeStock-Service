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
};
