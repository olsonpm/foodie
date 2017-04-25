'use strict';

var path = require('path');

module.exports = {
  devtool: 'source-map'
  , entry: path.join(__dirname, '../lib/static/js/index.js')
  , module: {
    rules: [
      {
        test: /\.js$/
        , exclude: /node_modules/
        , use: {
          loader: 'babel-loader'
          , options: {
            presets: ['env']
          }
        }
      }
    ]
  }
  , output: {
    filename: 'index.js'
    , path: path.resolve(__dirname, '../dist')
  }
};
