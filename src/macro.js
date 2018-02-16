const { translatePath } = require('./translate')
const { createMacro } = require('babel-plugin-macros')

function taggedTranslationsMacro({ references, config }) {
  references.default.forEach(({ parentPath }) => {
    if (parentPath.type === 'TaggedTemplateExpression') {
      translatePath(parentPath, config)
    } else {
      throw new TypeError(
        `tagged-translations/macro can only be used in tagged template expression. You tried ${
          parentPath.type
        }.`
      )
    }
  })
}

module.exports = createMacro(taggedTranslationsMacro, {
  configName: 'taggedTranslations'
})
