module.exports = {
  server: {
    proxy: {
      //代理的路径
      '/api': {
        target: 'http://localhost:3001', //转发的地址
        changeOrigin: true, //是否有跨域
      }
    }
  }
}
