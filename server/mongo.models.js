/* eslint-disable no-shadow */
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/robinhood', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
const { Schema } = mongoose;

const db = mongoose.connection;

const userSchema = new Schema({
  _id: Number,
  name: String,
  budget: Number,
  birthdate: Date,
  phoneNumber: String,
  street: String,
  city: String,
  state: String,
  zip: String,
  stocks: [{ stock: { type: Number, ref: 'Stock' }, quantity: Number }],
});

const stockSchema = new Schema({
  _id: Number,
  company: String,
  ticker: String,
  price: Number,
  ceo: String,
  employees: Number,
  founded: Date,
});

const transactionSchema = new Schema({
  _id: Number,
  date: Date,
  stock_id: { type: Number, ref: 'Stock' },
  type: String,
  by_user: { type: Number, ref: 'User' },
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
  insertUserStock: (userObj, stockAmount, qty) => {
    User.create(userObj)
      .then((user) => {
        Stock.aggregate([{ $sample: { size: stockAmount } }])
          .then((doc) => {
            const stocksArr = [];
            for (let i = 0; i < doc.length; i += 1) {
              let id = doc[i]._id;
              const stockObj = { stock: id, quantity: qty };
              stocksArr.push(stockObj);
            }
            User.findById(user._id, (err, theUser) => {
              if (!err) {
                theUser.stocks = stocksArr;
                theUser.save((err, theUser) => {
                  if (err) {
                    console.log(err);
                    return;
                  } else {
                    // console.log('User saved: ' + user);
                    return;
                  }
                });
              }
            });
          })
          .then((res) => res)
          .catch((err) => console.log(err));
      });
  },
  insetTransactions: (data) => {
    Transaction.create(data, (err, data) => {
      if (err) {
        console.log(err);
      }
    });
  },
  insertManyUsers: (data) => {
    User.insertMany(data, (err) => {
      if (err) {
        console.log(err);
      }
    });
  },
};
