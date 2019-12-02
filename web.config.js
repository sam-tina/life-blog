let isDev = process.env.NODE_ENV == 'development'

module.exports = {
  publicPath: isDev ? '/' : '/',
  port: 3000
}