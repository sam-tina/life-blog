const glob = require('glob')
const path = require('path')

const PAGES_DIR = path.resolve(__dirname, '../src/pages')

exports.entries = function() {
  const entryFiles = glob.sync(PAGES_DIR + '/*/*.js')
  const resultEntry = {}

  entryFiles.forEach(filePath => {
    const filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
    resultEntry[filename] = filePath
  })
  return resultEntry
}

exports.htmlPages = function() {
  const entryPugs = glob.sync(PAGES_DIR + '/*/*.pug')
  const resultPugPages = []

  entryPugs.forEach(filePath => {
    const filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
    const htmlPlugin = {
      template: filePath,
      filename: filename + '.html',
      chunks: filename,
      inject: true
    }
    
    resultPugPages.push(htmlPlugin)
  })
  return resultPugPages
}