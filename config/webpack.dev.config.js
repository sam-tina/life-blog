const { defaults } = require('lodash');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const base = require('./webpack.config');

module.exports = defaults({
  module: {
    rules: base.module.rules.map(rule => {
      if (!rule.test.test('a.styl')) {
        return rule
      }
      rule.use[0] = MiniCssExtractPlugin.loader
      return rule
    })
  },

  plugins: base.plugins.concat([
    new MiniCssExtractPlugin({
      FILENAME: 'screen.css'
    })
  ])
}, base)