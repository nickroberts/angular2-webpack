var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');
var webpack = require('webpack');
var hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',

  entry: {
    polyfills: ['./src/client/polyfills.ts', hotMiddlewareScript],
    vendor: ['./src/client/vendor.ts', hotMiddlewareScript],
    app: ['./src/client/main.ts', hotMiddlewareScript]
  },

  output: {
    path: __dirname,
    publicPath: '/',
    filename: '[name].js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],

  devServer: {
    historyApiFallback: true,
    stats: 'minimal'
  }
});
