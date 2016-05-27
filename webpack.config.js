const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    './src'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'auth0-web-header.js',
    publicPath: '',
    library: 'Auth0WebHeader',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: [path.join(__dirname, 'src')]
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }]
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
