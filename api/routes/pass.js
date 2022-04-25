var express = require('express');
var router = express.Router();

const generator = require("../public/javascripts/generator");

/* GET users listing. */
router.get('/', (req, res) => {
  const length = req.query.length;
  const capital = req.query.capital;
  const number = req.query.number;
  const symbol = req.query.symbol;
  res.send(generator.generate(length, capital, number, symbol));
});

module.exports = router;
