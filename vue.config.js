const { defineConfig } = require('@vue/cli-service')
const { resolve } = require('path')
const cpns = resolve(__dirname, 'src/components')
const views = resolve(__dirname, 'src/views')
module.exports = defineConfig({
  lintOnSave: false,
  transpileDependencies: true,
  configureWebpack: {
    devServer: {
      port: 8888,
      open: true,
      host: 'localhost'
    },
    resolve: {
      alias: {
        cpns,
        views
      }
    }
  }
})
