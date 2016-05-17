'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

var env = process.env.NODE_ENV || 'development';
var port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

if (env === 'development') {
  require('./config/server.dev')(app);
} else {
  require('./config/server.prod')(app);
}

app.listen(port);

console.log('Magic happens on port ' + port);
