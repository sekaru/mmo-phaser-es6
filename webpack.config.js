const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
var path = require('path')

var config = {
  target: 'web',
  entry: [
    './client/index.js'
  ],
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
        loaders: ['babel-loader']
      }
    ]
  },
  plugins: [
    new UglifyJsPlugin(),
    new HtmlWebpackPlugin({template: './client/index.html'})
  ]
}

module.exports = config