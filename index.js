const fs = require('fs')
const babel = require('@babel/core')
const usp = require('userscript-parser')

module.exports = function (sourceFile, targetFile) {
  const { metablock, content } = usp(fs.readFileSync(sourceFile, 'utf8'))
  const outro = ';exports["default"]()'
  const { code } = babel.transform(content, {
    plugins: ['@babel/plugin-transform-modules-commonjs']
  })

  const output = [metablock, code, outro].join('\n')
  fs.writeFileSync(targetFile, output)
}
