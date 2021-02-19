module.exports = {
  // publicPath:'/vue3-element-plus-admin/',
  devServer: {
    inline: true,
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3306/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      },
    }
  }
}