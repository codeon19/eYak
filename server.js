//server.js
'use strict'

//first we import our dependencies...
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var server = require('http').createServer(app);

//and create our instances
var app = express();
var router = express.Router();

var bodyParser = require('body-parser');
var Question = require('./Models/question');

//set our port to either a predetermined port number if you have set it up, or 3001
app.set('port', (process.env.PORT || 3001));

var mongoose = require('mongoose');
var mongoURI = "mongodb://localhost:3001/";
var MongoDB = mongoose.connect('mongodb://heroku_9pwktg9n:fpr8bebiq9sk9jjkdnn3cptlt5@ds147900.mlab.com:47900/heroku_9pwktg9n').connection;
MongoDB.on('error', function(err) { console.log(err.message); });
MongoDB.once('open', function() {
  console.log("mongodb connection open");
});

//now we should configure the API to use bodyParser and look for JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  //and remove cacheing so we get the most recent comments
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

//now  we can set the route path & initialize the API
var api = require('./routes/api');
app.use('/api', api);

server.listen(app.get('port'), () => {
  console.log('Server started at http://localhost:' + app.get('port'));
});
