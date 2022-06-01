var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

require('dotenv').config();

// Get the token
const axios = require('axios');
axios
  .get('http://127.0.0.1:5000/api/uuid/')
  .then(res => {
    process.env.TOKEN = res.data['uuid'];
    console.log(`currentToken: ${process.env.TOKEN}`);
  })
  .catch(error => {
    console.error(error);
  });

//Mongo Connection credentials
const mongoDb = require('./mongoDb');
mongoDb.connectToServer(function (err) {
  // Set routers
  var indexRouter = require('./routes/index');
  var passRouter = require('./routes/pass');
  var loginRouter = require('./routes/login');
  var registerRouter = require('./routes/register');

  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  // use cors
  const cors = require("cors");
  app.use(
    cors({
      origin: "*"
    }))

  // use routes
  app.use('/', indexRouter);
  app.use('/pass', passRouter);
  app.use('/login', loginRouter);
  app.use('/register', registerRouter);

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
})
module.exports = app;
