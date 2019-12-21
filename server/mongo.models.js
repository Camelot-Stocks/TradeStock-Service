/* eslint-disable no-shadow */
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/robinhood', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
const { Schema } = mongoose;

const db = mongoose.connection;

const userSchema = new Schema({
  name: String,
  budget: Number,
  birthdate: Date,
  phoneNumber: String,
  street: String,
  city: String,
  state: String,
  zip: String,
  stocks: [{ stock: { type: Schema.Types.ObjectId, ref: 'Stock' }, quantity: Number }],
});

const stockSchema = new Schema({
  company: String,
  ticker: String,
  price: Number,
  ceo: String,
  employees: Number,
  founded: Date,
});

const transactionSchema = new Schema({
  date: Date,
  stocks_id: Number,
  type: String,
  by: Number,
  quantity: Number,
  price_per_share: Number,
  total_price: Number,
});

const User = mongoose.model('User', userSchema);
const Stock = mongoose.model('Stock', stockSchema);
const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = {
  addUser: (callback, data) => {
    User.create(data, (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(null, data);
      }
    });
  },
  addStock: (callback, data) => {
    Stock.create(data, (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(null, data);
      }
    });
  },
  addTransaction: (callback, data) => {
    Transaction.create(data, (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(null, data);
      }
    });
  },
  addUserStock: (callback, data) => {
    const stockObj = { stock: data.stock_id, quantity: data.quantity };
    const success = 'updated';
    User.findByIdAndUpdate({ _id: data.user_id }, { $push: { stocks: stockObj } }, {}, (err, success) => {
      if (err) {
        callback(err);
      } else {
        callback(null, success);
      }
    });
  },
  getStocks: (callback) => {
    Stock.find({}, (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(null, data);
      }
    });
  },
  insertStock: (data) => {
    Stock.create(data, (err, data) => {
      if (err) {
        console.log(err);
      }
    });
  },
  insertUserStock: (userObj) => {
    // User.create(data, (err, data) => {
    //   if (err) {
    //     console.log(err);
    //   }
    //   console.log(data, 'seeded');
    // });
    Stock.find({}).then((doc) => {
      const id = doc[0]._id;
      const stockObj = { stock: id, quantity: 10 };
      User.create(userObj)
        .then((user) => User.findByIdAndUpdate({ _id: user._id }, { $push: { stocks: stockObj } }))
        .catch((err) => console.log(err));
    })
      .catch((err) => console.log(err));
  },
  getRandomStocks: (size) => {
    // Stock.aggregate([{ $sample: { size } }]);
  },
};
