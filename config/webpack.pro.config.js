const { defaults } = require('lodash');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const base = require('./webpack.config');

module.exports = defaults({
  mode: 'production',

  module: {
    rules: base.module.rules.map(rule => {
      if (!rule.test.test('*.styl')) {
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