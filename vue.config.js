const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': { // 将所有以 /api 开头的请求代理到后端
        target: 'http://127.0.0.1:80',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '', // 去除请求路径中的 /api
        },
      },
    },
  },
})
