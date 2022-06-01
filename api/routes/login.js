var express = require('express');
var router = express.Router();
const mongoDb = require('../mongoDb')
const db = mongoDb.getDb();
require('dotenv').config()

const users = 'users' //Collection name in MongoDb

router.post('/', function (req, res) {
    // Mongo Object ID
    var user_name = req.body.username;
    var password = req.body.password;
    if (user_name && password) {
        db.collection(users).findOne({ 'username': user_name, 'password': password }, (err, results) => {
            if (err) { return console.log(err) }
            console.log(results);
            if (results === null) { return res.send(null) }
            res.send({ token: { token: process.env.TOKEN }, identification: { identification: results["_id"] } });
        });
    } else {
        res.send(null);
    }
});

module.exports = router;
