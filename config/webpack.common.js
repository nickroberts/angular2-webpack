var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
  entry: {
    polyfills: './src/client/polyfills.ts',
    vendor: './src/client/vendor.ts',
    app: './src/client/main.ts'
  },

  resolve: {
    extensions: ['', '.js', '.ts', 'scss']
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'ts'
      },
      {
        test: /\.html$/,
        loader: 'html'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file?name=assets/[name].[hash].[ext]'
      },
      {
        test   : /\.css$/,
        loaders: ['style', 'css?sourceMap']
      },
      {
        test: /^(?!.*component).*\.scss$/,
        loaders: ['style', 'css', 'sass?sourceMap']
      },
      {
        test: /\.component\.scss$/,
        loaders: ['raw', 'sass?sourceMap']
      },
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'polyfills'],
      minChunks: 2
    }),

    new HtmlWebpackPlugin({
      template: 'src/client/index.html'
    })
  ]
};
