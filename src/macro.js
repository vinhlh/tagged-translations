const { translatePath } = require('./translate')
const { createMacro } = require('babel-plugin-macros')

function taggedTranslationsMacro({ references, config }) {
  references.default.forEach(({ parentPath }) => {
    if (parentPath.type === 'TaggedTemplateExpression') {
      return translatePath(parentPath, config)
    } else if (parentPath.type === 'SequenceExpression') {
      /**
       * XXX When using babel-plugin-macros vs istanbul,
       * the children of replaced node will be pointed to grand parent,
       * instead of parent.
       *
       * This is a hacky attempt to restore the correct parentPath.
       * This issue should be fixed on istanbul or babel sides.
       * https://github.com/babel/babel/issues/7596
       */
      const expressions = parentPath.get('expressions')
      if (
        expressions.length === 2 &&
        expressions[1].type === 'TaggedTemplateExpression'
      ) {
        return translatePath(expressions[1], config)
      }
    }

    throw new TypeError(
      `tagged-translations/macro can only be used in tagged template expression. You tried ${
        parentPath.type
      }.`
    )
  })
}

module.exports = createMacro(taggedTranslationsMacro, {
  configName: 'taggedTranslations'
})
