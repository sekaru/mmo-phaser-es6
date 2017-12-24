const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
var path = require('path');

var clientConfig = {
  target: 'web',
  entry: "./client/index.js",
  watch: true,
  output: {
    path: path.resolve(__dirname, 'bin/client'),
    filename: 'index.js'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loaders: ["babel-loader"]
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      }
    }),
    new HtmlWebpackPlugin({template: './client/index.html'})
  ]
}

module.exports = [ clientConfig ];