var express = require('express');
var router = express.Router();

// mongo
const mongoDb = require('../mongoDb')
const db = mongoDb.getDb();
const ObjectId = require('mongodb').ObjectId;
const users = 'users' //Collection name in MongoDb
const stored_passwords = 'stored_passwords';

const generator = require("../public/javascripts/generator");

/* Get Random Password */
router.get('/', (req, res) => {
  const length = req.query.length;
  const capital = req.query.capital;
  const number = req.query.number;
  const symbol = req.query.symbol;
  res.send(generator.generate(length, capital, number, symbol));
});

/* Add a password to the user */
router.post('/users/:id', (req, res) => {
  var user_id = req.params.id;
  var inputKey = req.body.key;
  var inputPassword = req.body.password;
  var access_token = req.query.access_token;
  if (access_token !== process.env.TOKEN) { return res.send(null) }

  if (inputKey && inputPassword && user_id) {
    var o_id = new ObjectId(user_id);

    // Find User
    db.collection(users).findOne({ '_id': o_id }, (err, results) => {
      if (err) return console.log(err)
      if (!results) { return res.send(null) }

      // If there are already 5 passwords, return error
      if (results[stored_passwords].length == 5) { return res.send(null) }

      // If the key or password already exists then return error, but only check if there are some stored password
      if (results[stored_passwords].length !== undefined) {
        for (const { key, password } of results[stored_passwords]) {
          if (key.toLowerCase() == inputKey.toLowerCase()) { return res.send(null) }
          if (password == inputPassword) { return res.send(null) }
        }
      }

      // Put new key and password into stored passwords array.
      db.collection(users).updateOne({ '_id': o_id }, {
        $push: {
          stored_passwords: { "key": inputKey, "password": inputPassword },
        }
      }, (err, results) => {
        if (err) return console.log(err)
        if (!results) { return res.send(null) }
      });
      return res.send("New Password Added");
    });
  } else {
    res.send(null);
  }
});

/* Get Stored Passwords for user */
router.get('/users/:id', (req, res) => {
  var user_id = req.params.id;
  var access_token = req.query.access_token;
  if (access_token !== process.env.TOKEN) { return res.send(null) }
  var o_id = new ObjectId(user_id);

  // Find user
  db.collection(users).findOne({ '_id': o_id }, (err, results) => {
    if (err) return console.log(err)
    if (!results) { return res.send(null) }
    return res.send(results[stored_passwords]);
  })
});

/* Delete Users stored password */
router.delete('/users/:id', (req, res) => {
  var user_id = req.params.id;
  var access_token = req.query.access_token;
  var inputKey = req.query.key;
  if (access_token !== process.env.TOKEN) { return res.send(null) }
  var o_id = new ObjectId(user_id);

  // Find User
  db.collection(users).findOne({ '_id': o_id }, (err, results) => {
    if (err) return console.log(err)
    if (!results) { return res.send(null) }

    // Remove the stored password based on inputkey
    db.collection(users).updateOne(
      { '_id': o_id },
      { $pull: { stored_passwords: { key: inputKey } } },
      false, // Upsert
      true, // Multi
    ), (err, results) => {
      if (err) return console.log(err)
      // If the user doesn't exist
      if (!results) { return res.send(null) }
    };
    return res.send("Password Deleted");
  })
});

/* Put new key into Users stored password */
router.put('/users/:id', (req, res) => {
  var user_id = req.params.id;
  var access_token = req.query.access_token;
  var inputKey = req.body.key;
  var inputPassword = req.body.password;
  var inputId = req.body.id;
  if (access_token !== process.env.TOKEN) { return res.send(null) }
  var o_id = new ObjectId(user_id);

  // Find User
  db.collection(users).findOne({ '_id': o_id }, (err, results) => {
    if (err) return console.log(err)
    if (!results) { return res.send(null) }

    // If the key already exists then return error, but only check if there are some stored password
    if (results[stored_passwords].length !== undefined) {
      for (const { key } of results[stored_passwords]) {
        if (key.toLowerCase() == inputKey.toLowerCase()) { return res.send(null) }
      }
    }

    // Update key where the inputId is located in the storedpasswords array.
    db.collection(users).updateOne(
      { '_id': o_id },
      { $set: { ["stored_passwords." + inputId]: { "key": inputKey, "password": inputPassword } } }
    ), (err, results) => {
      if (err) return console.log(err)
      if (!results) { return res.send(null) }
    };
    return res.send("New Key Stored")
  })
});

module.exports = router;
