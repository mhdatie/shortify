const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const CounterSchema = require('./models/counter');
const bodyParser = require('body-parser');

const router = require('./routes/index');

const app = express();

mongoose.connect('mongodb://localhost:27017/shortify');

mongoose.connection.on('open', () => {
  console.log(`MongoDB connected: ${mongoose.connection.db.databaseName}`);
});

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB error: ${err}`);
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ message: 'An Error Occurred', error: err });
});

module.exports = app;
