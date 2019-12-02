const { defaults } = require('lodash');
const base = require('./webpack.config');
const webpack = require('webpack');

module.exports = defaults({
  mode: 'development',
  devServer: {
    inline: true,
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}, base)