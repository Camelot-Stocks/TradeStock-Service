const express = require('express');
const bodyParser = require('body-parser');
const Controllers = require('./controllers.js');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Get a stock's details
app.get('/api/stocks/:stockId', (req, res) => {
  Controllers.getPgStock(req.params, res);
});

// Get a user's details
app.get('/api/users/:userId', (req, res) => {
  Controllers.getPgUser(req.params, res);
});

// Get all stocks owned by a user
app.get('/api/userstocks/:userId', (req, res) => {
  Controllers.getPgAllStocks(req.params, res);
});

// Get all transactions made by a user
app.get('/api/transactions/:userId', (req, res) => {
  Controllers.getPgUserTransactions(req.params, res);
});

// Add a transaction made by a user
app.post('/api/transaction', (req, res) => {
  Controllers.addPgTransaction(req, res);
});

app.post('/api/user', (req, res) => {
  Controllers.addPgUser(req, res);
});

app.post('/api/stock', (req, res) => {
  Controllers.addPgStock(req, res);
});


app.post('/api/userstock', (req, res) => {
  Controllers.addPgUsersStock(req, res);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
