import t from '../../src/macro'

const name = t`Hello ${'Vinh'}`

const funcReturnsOneTranslation = name => t`Hello ${name}`

const funcHasConditionalExpression = (name, success = true) =>
  success ? t`Hello ${name}` : "it's an error"
