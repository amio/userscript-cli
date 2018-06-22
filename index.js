const fs = require('fs')
const babel = require('@babel/core')

module.exports = function (sourceFile, targetFile) {
  const outro = ';exports["default"]()'
  const { code } = babel.transformFileSync(sourceFile, {
    plugins: ['@babel/plugin-transform-modules-commonjs']
  })

  fs.writeFileSync(targetFile, code + outro)
}
