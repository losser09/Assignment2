var express = require('express');
var path = require('path');
var promoRouter = require('./routes/promoRouter');
var leaderRouter = require('./routes/leaderRouter');

const mongoose = require('mongoose');

var mongoDB = 'mongodb://127.0.0.1/assignment2';
const connect=mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });

var app = express();


app.use('/promotions',promoRouter);
app.use('/leaders',leaderRouter);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports =app;
