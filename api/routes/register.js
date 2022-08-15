var express = require('express');
var router = express.Router();

// mongo
const mongoDb = require('../mongoDb')
const db = mongoDb.getDb();
const users = 'users' //Collection name in MongoDb
require('dotenv').config()

function userObj(userName, password) {
    let userModel =
    {
        "username": userName,
        "password": password,
        "stored_passwords": []
    }
    return userModel
}
/* Register User */
router.post('/', function (req, res) {
    // Mongo Object ID
    var user_name = req.body.username;
    var password = req.body.password;
    if (user_name && password) {
        db.collection(users).findOne({ 'username': user_name }, (err, results) => {
            if (err) { return console.log(err) }
            console.log(results);
            // If a user exists then return null
            if (results !== null) { return res.send(null) }

            // register user
            db.collection(users).insertOne(userObj(user_name, password), (err, results) => {
                if (err) { return console.log(err) }
                console.log(results);
                res.send({ token: { token: process.env.TOKEN }, identification: { identification: results["insertedId"] } });
            });
        });
    } else {
        res.send(null);
    }
});
module.exports = router;
