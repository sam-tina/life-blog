const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path')
const { entries } = require('./entrys')
const { isDev } = require('./env')
const { publicPath } = require('../web.config')

const config = {
  devtool: '#source-map',
  entry: entries(),
  output: {
    filename: 'static/js/[name].js?v=[hash]',
    chunkFilename: 'static/js/[id].chunk.js',
    path: isDev ? path.join(__dirname, 'dist') : path.join(__dirname, '../dist'),
    publicPath: publicPath
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
      },
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          'css-loader',
          'stylus-loader'
        ]
      }, 
      {
        test: /\.(png|jpg|gif|svg|woff2|eot|woff|ttf|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets'
            }
          }
        ]
      }
    ]
  },
  plugins: []
}

const pages = Object.keys(config.entry)
config.plugins = config.plugins.concat(pages.map(page => {
  return new HtmlWebpackPlugin({
    filename: page === 'index' ? `${page}.html` : `${page}/index.html`,
    template: path.resolve(__dirname, `../pages/${page}.pug`),
    chunks: [page],
  })
}))

module.exports = config