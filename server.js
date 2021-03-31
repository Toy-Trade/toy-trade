const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const MongoClient = require('mongodb').MongoClient;

const multer = require('multer');
const body_parser = require('body-parser');

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, __dirname + '/toytrade/src/assets/uploads') /* <-- must create this folder manually! */
  },
  filename: function(req, file, cb) {
    // cb(null, file.originalname) /* <-- could make another name too */
    cb(null, req.body.text_value + ".jpg")
  }
})
const upload = multer({ storage: storage });

app.use(express.static(path.join(__dirname, './toytrade/dist/toytrade')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(body_parser.json());

// Make a connection to MongoDB
const url = 'mongodb+srv://dbUser:OrgUser78@cluster0.k5fln.mongodb.net/ToyTrade?retryWrites=true&w=majority';
const dbName = 'ToyTrade';
const client = new MongoClient(url);

// app.use(express.static("public"));

app.get('/', (req, res) => {
  res.send();
});

// Get data from Toys collection
app.get('/api/v1/toys', (req, res) => {
  // Use connect method to connect to the server
  client.connect(function(err) {
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    // Get the Toys collection
    const collection = db.collection('Toys');
    
    // Get some documents from the Toys collection
    collection.find().toArray(function(err, docs) {
      console.log('Found the following records');
      console.log(docs);
      res.json(docs);
    });
  }); 
});

// Get data from Users collection
app.get('/api/v1/users/:userId', (req, res) => {
  let userId = req.params.userId;
  console.log("userId: " + userId);
  // Use connect method to connect to the server
  client.connect(function(err) {
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    // Get the Users collection
    const collection = db.collection('Users');
    
    // Get some documents from the Toys collection
    collection.find({uid:userId}).toArray(function(err, docs) {
      console.log('Found the following records');
      console.log(docs);
      res.json(docs);
    });
  }); 
});

// Add user to database
app.post('/api/v1/users/:uid', (req, res) => {
  console.log("Successful Add User POST Request")
  // Use connect method to connect to the server
  client.connect(function(err) {
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    // Get the Users collection
    const collection = db.collection('Users');
    collection.find({uid: req.body.uid}).toArray(function(err, docs) {
      if (docs.length == 0) {
        // Get some documents from the Users collection
        collection.insertOne(req.body, function(err, docs) {
          console.log("Inserted one user");
        });
      } else {
        console.log("Found the following duplicate");
        console.log(docs);
      }
    });
  });
});

// Add toy to database
app.post('/api/v1/toys', (req, res) => {
  console.log("Successful Add Toy POST Request")
  // Use connect method to connect to the server
  client.connect(function(err) {
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    // Get the Toys collection
    const collection = db.collection('Toys');
    
    // Get some documents from the Toys collection
    collection.insertOne(req.body, function(err, docs) {
      console.log("Inserted one toy")
    });
  });
});

// Upload toy image
app.post('/upload', upload.single('objectid'), (req, res) => {
  if(req.file) {
    res.json(req.file); /* <-- for debugging */
    // req.body to get hidden input
    // See if you can edit the file's name in the form in frontend
    console.log(req.body.text_value)
  }
  else throw 'error';
});

app.listen(port, () => {
  console.log('Listening on *:3000');
});