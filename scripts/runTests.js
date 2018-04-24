const babel = require('babel-core')
const fs = require('fs')
const path = require('path')
const merge = require('lodash.merge')

const runTests = (
  dir,
  presets = ['react', 'es2015'],
  plugins,
  error = false
) => {
  const configs = {
    presets,
    plugins: plugins || [
      [
        require('../src'),
        {
          translation: './translations/default.json',
          tagName: 't'
        }
      ]
    ]
  }

  // set cwd to tests's location
  process.chdir(dir)

  fs
    .readdirSync(dir)
    .filter(
      fileName =>
        !fileName.endsWith('tests.js') &&
        !fileName.endsWith('.config.js') &&
        fileName.endsWith('.js')
    )
    .forEach(fileName => {
      test(`test ${fileName}`, done => {
        fs.readFile(dir + '/' + fileName, (err, data) => {
          if (err) {
            throw err
          }

          const input = data.toString()
          const babelConfigs = merge(configs, { filename: fileName })

          if (error) {
            expect(() => {
              babel.transform(input, babelConfigs)
            }).toThrowErrorMatchingSnapshot()
          } else {
            const output = babel.transform(input, babelConfigs)
            expect(output.code).toMatchSnapshot()
          }

          done()
        })
      })
    })
}

global.runTests = runTests
