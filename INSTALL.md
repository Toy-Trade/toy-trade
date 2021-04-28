# Installation Guide

## How to Run Application

1. Clone this repository.

2. Go to your terminal and `cd` into `toy-trade`.

3. Run `npm install`.

4. Open a separate terminal and `cd` into `toy-trade/toytrade`. Run `npm install`. Then run `ng build --watch`.

5. In the `toy-trade` (Node.js directory), run `node server`.

6. In your browser, go to `http://localhost:3000/`.

## How to Set Up Database

1. In MongoDB Compass, create a database called *ToyTrade*

2. In that database, create six collections called *Users*, *Toys*, *MessageGroups*, *Messages*, *Transactions*, and *Notifications*

3. In this repository, at `toytrade/src/assets/json` there are two JSON files.

4. In the *Users* collection, import the *users.json* file.

5. To upload a sample set of toys in the *Toys* collection, import the *toys.json* file.

6. Change the connection string URL in *server.js* (line 28) with your username and password.

7. Woohoo! You have set up a database!
