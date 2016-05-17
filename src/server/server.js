// TODO: get this to work...
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
  // Step 1: Create & configure a webpack compiler
  var webpack = require('webpack');
  var webpackConfig = require(__dirname + '/../../webpack.config.js');
  var compiler = webpack(webpackConfig);

  // Step 2: Attach the dev middleware to the compiler & the server
  app.use(require('webpack-dev-middleware')(compiler, {
    // noInfo: true,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    },
    publicPath: webpackConfig.output.publicPath
  }));

  // Step 3: Attach the hot middleware to the compiler & the server
  app.use(require('webpack-hot-middleware')(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
  }));

  app.get('*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
  });
  // var webpack = require('webpack');
  // var config = require(__dirname + '/../../webpack.config.js');
  // var compiler = webpack(config);
  // var middleware = require('webpack-dev-middleware')(compiler, {
  //   publicPath: config.output.publicPath,
  //   stats: {
  //     colors: true,
  //     hash: false,
  //     timings: true,
  //     chunks: false,
  //     chunkModules: false,
  //     modules: false
  //   }
  // });
  // app.use(middleware);
  // app.use(require('webpack-hot-middleware')(compiler));
  // app.get('*', function response(req, res) {
  //   res.write(middleware.fileSystem.readFileSync(path.join(__dirname, '../../dist/index.html')));
  //   res.end();
  // });
} else {
  app.use(express.static(__dirname + '/../../dist'));
  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
  app.get('*', function(req, res) {
    res.sendFile('index.html', { 'root': __dirname + '/../../dist' });
  });
}

app.listen(port);

console.log('Magic happens on port ' + port);
