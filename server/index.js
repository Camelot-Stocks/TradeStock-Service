const express = require('express');
const bodyParser = require('body-parser');
const Controllers = require('./controllers.js');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api/transactions', (req, res) => {
  //
});

app.get('/api/transactions/:userid', (req, res) => {
  //
});

app.post('/api/user', (req, res) => {
  Controllers.addMongoUser(req, res);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
