var webpack = require('webpack');
var webpackConfig = require(__dirname + '/../../../webpack.config.js');
var compiler = webpack(webpackConfig);

module.exports = function(app) {
  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  }));
  app.use(require('webpack-hot-middleware')(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
  }));
  app.get('*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
  });
};
