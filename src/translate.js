const fs = require('fs')
const path = require('path')

const DEFAULT_TAGNAME = 't'
const DEFAULT_TRANSLATION_FILE = './translations/default.json'

function translate(quasis, translationFile) {
  const translations = getTranslations(translationFile)
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
  const translationsFile = path.resolve(process.cwd(), file)
  return JSON.parse(fs.readFileSync(translationsFile, 'utf-8'))
}

function translatePath(path, options = {}) {
  const { node } = path
  const {
    tagName = DEFAULT_TAGNAME,
    translationFile = DEFAULT_TRANSLATION_FILE
  } = options

  if (node.tag.name !== tagName) {
    return
  }

  translate(node.quasi.quasis, translationFile)
  path.replaceWith(node.quasi)
}

module.exports = {
  translate,
  translatePath
}
