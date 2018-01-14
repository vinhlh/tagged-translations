const { translatePath } = require('./translate')

module.exports = ({ types: t }) => ({
  visitor: {
    TaggedTemplateExpression(path, { opts }) {
      translatePath(path, opts)
    }
  }
})
