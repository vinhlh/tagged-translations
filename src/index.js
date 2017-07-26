const fs = require('fs')
const path = require('path')

const translate = (quasis, translations) => {
  const text = quasis.map(element => element.value.raw).join('%s')
  if (!translations[text]) {
    return
  }

  const translatedTexts = translations[text].split('%s')
  if (quasis.length !== translatedTexts.length) {
    return
  }

  quasis.forEach((element, index) => {
    element.value.cooked = translatedTexts[index]
    element.value.raw = translatedTexts[index]
  })
}

const getTranslations = file => {
  if (!file) {
    return {}
  }

  const translationsFile = path.resolve(process.cwd(), file)
  return JSON.parse(fs.readFileSync(translationsFile, 'utf-8'))
}

module.exports = ({ types: t }) => ({
  visitor: {
    TaggedTemplateExpression(
      path,
      { opts: { tagName = 't', translation = null } }
    ) {
      const translations = getTranslations(translation)
      const { node } = path

      if (node.tag.name !== tagName) {
        return
      }

      translate(node.quasi.quasis, translations)
      path.replaceWith(node.quasi)
    }
  }
})
