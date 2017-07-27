const translate = require('./translate')

const DEFAULT_TAGNAME = 't'
const DEFAULT_TRANSLATIONS_LOCATION = './translations/default.json'

module.exports = ({ babel: { template, types }, references }) => {
  references.default.forEach(({ parentPath: path }) => {
    const { node } = path
    if (node.tag.name !== DEFAULT_TAGNAME) {
      return
    }

    translate(node.quasi.quasis, DEFAULT_TRANSLATIONS_LOCATION)
    path.replaceWith(node.quasi)
  })
}
