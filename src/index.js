const translate = require('./translate')

module.exports = ({ types: t }) => ({
  visitor: {
    TaggedTemplateExpression(
      path,
      { opts: { tagName = 't', translation = null } }
    ) {
      const { node } = path
      if (node.tag.name !== tagName) {
        return
      }

      translate(node.quasi.quasis, translation)
      path.replaceWith(node.quasi)
    }
  }
})
