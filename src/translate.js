const fs = require('fs')
const path = require('path')

const translate = (quasis, translation) => {
  const translations = getTranslations(translation)
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

module.exports = translate
