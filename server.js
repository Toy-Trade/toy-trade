const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const MongoClient = require('mongodb').MongoClient;

app.use(express.static(path.join(__dirname, './toytrade/dist/toytrade')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make a connection to MongoDB
const url = 'mongodb+srv://dbUser:OrgUser78@cluster0.k5fln.mongodb.net/ToyTrade?retryWrites=true&w=majority';
const dbName = 'ToyTrade';
const client = new MongoClient(url);

// app.use(express.static("public"));

app.get('/', (req, res) => {
  res.send();
});

// Add user to database
app.post('/api/v1/users/:uid', (req, res) => {
  console.log("Successful post")
  // Use connect method to connect to the server
  client.connect(function(err) {
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    // Get the Parks collection
    const collection = db.collection('Users');
    
    // Get some documents from the Parks collection
    collection.insertOne(req.body, function(err, docs) {
      console.log("Inserted one document")
    });
  });
});

app.listen(port, () => {
  console.log('Listening on *:3000');
});