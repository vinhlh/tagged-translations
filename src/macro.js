const { translatePath } = require('./translate')
const { createMacro } = require('babel-plugin-macros')

function taggedTranslationsMacro({ references, config }) {
  references.default.forEach(({ parentPath: path }) => {
    translatePath(path, config)
  })
}

module.exports = createMacro(taggedTranslationsMacro, {
  configName: 'taggedTranslations'
})
