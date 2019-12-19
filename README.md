# API routes

get all users: /api/users

get a user: /api/user/:id
{id: 1,
name: 'John',
budget: 1000,
birthdate: '1970-07-12',
phone_number:'800-888-1234',
street: 'Howard',
city: 'SF',
state: 'CA',
zip: 92100,
stocks: []
}

get all stocks: /api/stocks

get one stock: /api/stock/:id
{id: 1,
price: 435.2,
ceo: 'Tim Cook',
employees: 17500,
founded: 1971,
category: 'tech'}

post to stocks: /api/stocks/transactions/:id
// user buys or sells a number of shares
{stocks_id: 1003, 
quantity: 14, 
type: buy}

// and adds a row to transactions: 
Transactions: {
id: 10023538, 
date: '12-18-2019-11-17-23AM',
stocks_id: 2084253,
type: 'buy',
by: 1,
quantity: 14,
price_per_share: 10,
total_price: 140
} 

update a user: /api/user/:id
{
id: 1,
name: 'John',
budget: 2000,
birthdate: '1970-07-12',
phone_number:'800-888-1234',
street: 'Howard',
city: 'SF',
state: 'CA',
zip: 92100
stocks: [{stocks_id: 2084253, quantity: 14 }]
}

update a stock: /api/stock/:id
{id: 1, price: 1000.21, ceo: 'Tim Cook', employees: 17500, founded: 1971, category: 'tech' }

delete a user: /api/user/:id

delete a stock: /api/stock/:id

# Robinhood-TradeStock

Step 1:
Run npm i to install dependencies

Step 2: 
Create a database named 'robinhood' in MySQL. 

Step 3:
In the server directory in database.js file on line 3, you will need to change the username
and password to match your environment. I currently have it set to 'root' and ''. 

Step 4: 
To populate DB:
npm run db:setup

Step 5:
To run server: 
npm start 

Step 6: 

In app.jsx line 48, I enter the ticker symbol to be used. You'll have to look in the database and grab a ticker symbol that is created from the seeding of the data. 

Also, in server.js line 16, a random User Id is being chosen to test. If you'd like a specific user, you can change the id number here. 

Step 7: 

If you need to change the port number, it's in server directory in start.js file.
