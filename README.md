# API routs

get all users: /api/users

get a user: /api/user/:id
{id: 1, name: 'John', budget: 1000, age: 59, phone_number:'800-888-1234', house_number: 1234, street: 'Howard', city: 'SF', state: 'CA', zip: 92100}

get all stocks: /api/stocks

get one stock: /api/stock/:id
{id: 1, price: 435.2, ceo: 'Tim Cook', employees: 17500, founded: 1971, category: 'tech' }

post to stocks: /api/stocks

update a user: /api/user/:id
{id: 1, name: 'John', budget: 2000, age: 23, phone_number:'800-888-1234', house_number: 1234, street: 'Howard', city: 'SF', state: 'CA', zip: 92100}

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
