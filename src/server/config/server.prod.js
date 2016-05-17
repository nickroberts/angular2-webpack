var express = require('express');

module.exports = function(app) {
  app.use(express.static(__dirname + '/../../../dist'));
  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
  app.get('*', function(req, res) {
    res.sendFile('index.html', { 'root': __dirname + '/../../../dist' });
  });
};
