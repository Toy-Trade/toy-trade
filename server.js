const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const fs = require('fs');
const { Parser } = require('json2csv');
const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;

const multer = require('multer');

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

// Make a connection to MongoDB
const url = 'mongodb+srv://dbUser:OrgUser78@cluster0.k5fln.mongodb.net/ToyTrade?retryWrites=true&w=majority';
const dbName = 'ToyTrade';
const client = new MongoClient(url);

// app.use(express.static("public"));

app.get('/', (req, res) => {
  res.send();
});

// Get data from Toys collection
app.get('/api/v1/toys', async (req, res) => {
  // Use connect method to connect to the server
  client.connect(async function(err) {
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    // Get the Toys collection
    const collection = db.collection('Toys');
    const collection1 = db.collection('Users');
    
    // Get some documents from the Toys collection
    const response = await collection.find().toArray();
    // console.log(response)
    for (let i = 0; i < response.length; i++) {
      const subResponse = await collection1.findOne({uid: response[i].userId})
      console.log(subResponse)
      response[i]["username"] = subResponse.username;
      response[i]["profileUrl"] = subResponse.photoURL;
    }

    console.log(response)
    res.json(response)
  });

  // var myData = {
  //   name: "Joyce",
  //   age: 19
  // }
  // console.log("hi")
  // try {
  //   const parser = new Parser();
  //   const csv = parser.parse(myData);
  //   console.log(typeof csv);
  //   console.log(csv);
  //   fs.writeFile('toytrade/src/assets/csv/test.csv', csv, (err) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       console.log("File written successfully\n"); 
  //       console.log("The written has the following contents:"); 
  //       console.log(fs.readFileSync("toytrade/src/assets/csv/test.csv", "utf8"));
  //     }
  //   });
  // } catch (err) {
  //   console.error(err);
  // }
});

// Get data from specific user's Toys collection
app.get('/api/v1/toys/users/:userId', async (req, res) => {
  // Use connect method to connect to the server
  client.connect(async function(err) {
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    // Get the Toys collection
    const collection = db.collection('Toys');
    const collection1 = db.collection('Users')

    // Get some documents from the Toys collection
    const response = await collection.find({userId: req.params.userId}).toArray();
    const subResponse = await collection1.findOne({uid: req.params.userId})
    for (let i = 0; i < response.length; i++) {
      response[i]["username"] = subResponse.username;
    }

    console.log(response)
    res.json(response)
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
    
    // Get some documents from the Users collection
    collection.find({uid:userId}).toArray(function(err, docs) {
      // console.log('Found the following user');
      // console.log(docs);
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
          res.json({inserted: true});
        });
      } else {
        // console.log("Found the following duplicate");
        // console.log(docs);
        res.json({inserted: false});
      }
    });
  });
});

// Add new user information to the database
app.put('/api/v1/users/:uid', (req, res) => {
  let myUid = req.params.uid;
  console.log("Successful Add New User PUT Request")
  // Use connect method to connect to the server
  client.connect(function(err) {
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    // Get the Users collection
    const collection = db.collection('Users');
    collection.find({uid: req.body.uid}).toArray(function(err, docs) {
      
    });

    collection.updateOne (
      { uid: myUid },
      { $set: { username: req.body.username, zipcode: req.body.zipcode, bio: req.body.bio } }
    )
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
      res.json(docs.ops[0]._id);
    });
  });
});

// Upload toy image
app.post('/upload', upload.single('objectid'), (req, res) => {
  if(req.file) {
    res.redirect("http://localhost:3000");
    res.json(req.file); /* <-- for debugging */
    // req.body to get hidden input
    // See if you can edit the file's name in the form in frontend
    console.log(req.body.text_value)
  }
  else throw 'error';
});

//Toy notification request
app.post('/api/v1/notifications', (req, res) => {
  console.log("Successful Request Toy POST Request")
  // Use connect method to connect to the server
  client.connect(function(err) {
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    // Get the Notifications collection
    const collection = db.collection('Notifications');

    collection.find({senderId: req.body.senderId, toyId: req.body.toyId}).toArray(function(err, docs) {
      if (docs.length == 0) {
        // Get some documents from the Notifications collection
        collection.insertOne(req.body, function(err, docs) {
          console.log("Inserted one request notification")
          res.json(docs.ops[0]._id);
        });
      } else {
        // console.log("This request has already been made");
        // console.log(docs);
        res.json({inserted: false});
      }
    });
    
    // // Get some documents from the Notifications collection
    // collection.insertOne(req.body, function(err, docs) {
    //   console.log("Inserted one request notification")
    //   res.json(docs.ops[0]._id);
    // });
  });
});

//Get users notifications
app.get('/api/v1/notifications/users/:userId', async (req, res) => {
  let userId = req.params.userId;
  console.log("userId: " + userId);
  // Use connect method to connect to the server
  client.connect(async function(err) {
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    // Get the Notifications collection
    const collection = db.collection('Notifications');
    const collection1 = db.collection('Users');
    const collection2 = db.collection('Toys');

    // Get some documents from the Notifications collection
    const response = await collection.find({receiverId:userId}).toArray();
    for (let i = 0; i < response.length; i++) {
      const subResponse = await collection1.findOne({uid: response[i].senderId});
      let myObject = new ObjectId(response[i].toyId);
      const subResponse1 = await collection2.findOne({_id: myObject});
      response[i]["senderUsername"] = subResponse.username;
      response[i]["toyName"] = subResponse1.title;
    }

    console.log(response)
    res.json(response)
  }); 
});

//Get Toy from ID
app.get('/api/v1/toys/:toyId', (req, res) => {
  let toyId = req.params.toyId;
  console.log("toyId: " + toyId);
  // Use connect method to connect to the server
  client.connect(function(err) {
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    // Get the Toys collection
    const collection = db.collection('Toys');
    
    // Get some documents from the Toys collection
    let myObject = new ObjectId(toyId);
    collection.find({_id: myObject}).toArray(function(err, docs) {
      // console.log('Found the following toy');
      // console.log(docs);
      res.json(docs);
    });
  }); 
});

// LAB 6
// Get Brands CSV: Joyce
app.get('/api/v1/csv/brands', (req, res) => {
  // Use connect method to connect to the server
  client.connect(function(err) {
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    // Get the Toys collection
    const collection = db.collection('Toys');
    
    // Get some documents from the Toys collection
    collection.aggregate([{$project: {'brand':1}}]).toArray(function(err, docs) {
      console.log('Found the following brands:');
      console.log(docs);

      try {
        const parser = new Parser();
        const csv = parser.parse(docs);
        console.log(csv);
        fs.writeFile('toytrade/src/assets/csv/brands.csv', csv, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("File written successfully\n"); 
            console.log("The written has the following contents:"); 
            console.log(fs.readFileSync("toytrade/src/assets/csv/brands.csv", "utf8"));
          }
        });
      } catch (err) {
        console.error(err);
      }
    });
  });
  res.json({"success":true});
});


// Get CSV for Toy Requests: Joyce
app.get('/api/v1/csv/toyrequests', (req, res) => {
  // Use connect method to connect to the server
  client.connect(function(err) {
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    // Get the Notifications collection
    const collection = db.collection('Notifications');
    
    // Get some documents from the Notifications collection
    collection.aggregate([{$project: {'toyId':1}}]).toArray(function(err, docs) {
      console.log('Found the following notifications:');
      console.log(docs);

      try {
        const parser = new Parser();
        const csv = parser.parse(docs);
        console.log(csv);
        fs.writeFile('toytrade/src/assets/csv/toyrequests.csv', csv, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("File written successfully\n"); 
            console.log("The written has the following contents:"); 
            console.log(fs.readFileSync("toytrade/src/assets/csv/toyrequests.csv", "utf8"));
          }
        });
      } catch (err) {
        console.error(err);
      }
    });
  });
  res.json({"success":true});
});

// Get Categories CSV: Jody
app.get('/api/v1/csv/categories', (req, res) => {
  // Use connect method to connect to the server
  client.connect(function(err) {
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    // Get the Toys collection
    const collection = db.collection('Toys');
    
    // Get some documents from the Toys collection
    collection.aggregate([{$project: {'category':1}}]).toArray(function(err, docs) {
      console.log('Found the following categories:');
      console.log(docs);

      try {
        const parser = new Parser();
        const csv = parser.parse(docs);
        console.log(csv);
        fs.writeFile('toytrade/src/assets/csv/categories.csv', csv, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("File written successfully\n"); 
            console.log("The written has the following contents:"); 
            console.log(fs.readFileSync("toytrade/src/assets/csv/categories.csv", "utf8"));
          }
        });
      } catch (err) {
        console.error(err);
      }
    });
  });
  res.json({"success":true});
});

// Get Users Requests CSV: Jody
app.get('/api/v1/csv/userrequests', (req, res) => {
  // Use connect method to connect to the server
  client.connect(function(err) {
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    // Get the Toys collection
    const collection = db.collection('Notifications');
    
    // Get some documents from the Toys collection
    collection.aggregate([{$project: {'receiverId':1}}]).toArray(function(err, docs) {
      console.log('Found the following users:');
      console.log(docs);

      try {
        const parser = new Parser();
        const csv = parser.parse(docs);
        console.log(csv);
        fs.writeFile('toytrade/src/assets/csv/user_requests.csv', csv, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("File written successfully\n"); 
            console.log("The written has the following contents:"); 
            console.log(fs.readFileSync("toytrade/src/assets/csv/user_requests.csv", "utf8"));
          }
        });
      } catch (err) {
        console.error(err);
      }
    });
  });

  res.json({"success":true});
});

// Deny toy request, archive the request notification
app.put('/api/v1/notifications/requests/deny/:requestId', (req, res) => {
  let requestId = req.params.requestId;
  console.log("Request id: " + requestId)
  // Use connect method to connect to the server
  client.connect(function(err) {
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    // Get the Notifications collection
    const collection = db.collection('Notifications');
    
    // Update with request notification as archived: true
    let myObject = new ObjectId(requestId);
    collection.updateOne (
      { _id: myObject },
      { $set: { archived: true, status: "denied" } }
    )

    console.log("Notification has been archived")
  }); 
});

// Accept toy request, post request to create two new notifications, 
// then put request to archive the notification request
app.post('/api/v1/notifications/requests/accept/:requestId', (req, res) => {
  let requestId = req.params.requestId;
  console.log("Request id: " + requestId)
  // Use connect method to connect to the server
  client.connect(function(err) {
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    // Get the Notifications collection
    const collection = db.collection('Notifications');
    const collection1 = db.collection('MessageGroups');

    // Create message group between two users
    let messageGroup = {
      userId1: req.body.senderId,
      userId2: req.body.receiverId
    }

    // let existingMessageGroup = "";

    collection1.find({$or: [{userId1: req.body.senderId, userId2: req.body.receiverId}, {userId1: req.body.receiverId, userId2: req.body.senderId}]}).toArray(function(err, docs) {
      if (docs.length == 0) {
        collection1.insertOne(messageGroup, function(err, docs) {
          console.log("Inserted message group");
    
          let myMessageGroupId = docs.ops[0]._id;
    
          let notification1 = {
            // it would say "You have accepted @user's request for your toy"
            type: "accept_acceptor",
            senderId: req.body.senderId,
            receiverId: req.body.receiverId,
            toyId: req.body.toyId,
            date: new Date(),
            archived: false,
            messageGroupId: myMessageGroupId
          }
      
          let notification2 = {
            // it would say "Your request for toy from @user has been accepted."
            type: "accept_receiver",
            senderId: req.body.receiverId,
            receiverId: req.body.senderId,
            toyId: req.body.toyId,
            date: new Date(),
            archived: false,
            messageGroupId: myMessageGroupId
          }
      
          collection.insertOne(notification1, function(err, docs) {
            console.log("Inserted notification1");
            // res.json({inserted: true});
          });
      
          collection.insertOne(notification2, function(err, docs) {
            console.log("Inserted notification2");
            // res.json({inserted: true});
          });
      
          // Update with request notification as archived: true
          let myObject = new ObjectId(requestId);
          collection.updateOne (
            { _id: myObject },
            { $set: { archived: true, status: "accepted" } }
          )
      
          console.log("Original Request Notification has been archived");
      
          res.json([notification1]);
        });
      } else {
        // Set message group id to existing one
        console.log("Found existing message group");
        console.log("Did not insert new message group");
  
        let myMessageGroupId = docs[0]._id;

        let notification1 = {
          // it would say "You have accepted @user's request for your toy"
          type: "accept_acceptor",
          senderId: req.body.senderId,
          receiverId: req.body.receiverId,
          toyId: req.body.toyId,
          date: new Date(),
          archived: false,
          messageGroupId: myMessageGroupId
        }
    
        let notification2 = {
          // it would say "Your request for toy from @user has been accepted."
          type: "accept_receiver",
          senderId: req.body.receiverId,
          receiverId: req.body.senderId,
          toyId: req.body.toyId,
          date: new Date(),
          archived: false,
          messageGroupId: myMessageGroupId
        }
    
        collection.insertOne(notification1, function(err, docs) {
          console.log("Inserted notification1");
          // res.json({inserted: true});
        });
    
        collection.insertOne(notification2, function(err, docs) {
          console.log("Inserted notification2");
          // res.json({inserted: true});
        });
    
        // Update with request notification as archived: true
        let myObject = new ObjectId(requestId);
        collection.updateOne (
          { _id: myObject },
          { $set: { archived: true, status: "accepted" } }
        )
    
        console.log("Original Request Notification has been archived");
    
        res.json([notification1]);
      }
    });
  }); 
});

app.get("/api/v1/messagegroups/:userId", async (req, res) => {
  let userId = req.params.userId;
  console.log("userId: " + userId);
  // Use connect method to connect to the server
  client.connect(async function(err) {
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    // Get the Users collection
    const collection = db.collection('MessageGroups');
    const collection1 = db.collection('Users');
    let messageGroups = [];
    const response = await collection.find({$or: [{userId1: userId}, {userId2: userId}]}).toArray();
    // console.log(response)
    for (let i = 0; i < response.length; i++) {
      let otherUser = "";
      if (response[i].userId1 == userId){
        otherUser = response[i].userId2;
      }else{
        otherUser = response[i].userId1;
      }
      const subResponse = await collection1.findOne({uid: otherUser})
      //console.log(subResponse)
      let messageGroup = {
        otherUserId: otherUser,
        otherUsername: subResponse.username,
        messageGroupId: response[i]._id
        
      }
      messageGroups.push(messageGroup);
    }
    res.json(messageGroups);
  }); 
});



app.listen(port, () => {
  console.log('Listening on *:3000');
});
