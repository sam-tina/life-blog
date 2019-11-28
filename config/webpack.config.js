const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path')

const config = {
  context: path.resolve(__dirname, '../js'),
  entry: {
    index: './index.js'
  },
  rules: [
    {
      test: /\.pug$/,
      loader: 'pug-loader',
    }
  ]
}

const pages = Object.keys(config.entry)
config.plugins = config.plugins.concat(pages.map(page => {
  return new HtmlWebpackPlugin({
    filename: page === 'index' ? `${page}.html` : `${page}/index.html`,
    template: path.resolve(__dirname, `../pages/${page}.pug`),
    chunks: [page],
  })
}))