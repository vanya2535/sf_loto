const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.plugin('eslint').tap((args) => {
      args[0].fix = true
      return args
    })
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @import "~@/assets/scss/core/variables.scss";
          @import "~@/assets/scss/core/blocks.scss";
          @import "~@/assets/scss/core/elements.scss";
        `
      }
    }
  }
})
