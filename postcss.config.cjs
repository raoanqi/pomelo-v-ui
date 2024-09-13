/* eslint-env node */
module.exports = {
  plugins: [
    require('postcss-nested'),
    require('postcss-each-variables'),
    // 先把混合色遍历出来，然后交给@each处理，所以这里需要额外配置
    require('postcss-each')({
      plugins: {
        beforeEach: [require('postcss-for'), require('postcss-color-mix')]
      }
    })
  ]
}
