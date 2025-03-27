const http = require('node:http');
const fs = require('node:fs')
const url = require('node:url')
const html = fs.readFileSync('./index.html') //给html文件起个服务
const { createProxyMiddleware } = require('http-proxy-middleware')
const config = require('./aiolimp.config.js')
const server = http.createServer((req, res) => {
  const pathname = url.parse(req.url).pathname.replace(/\/$/, ''); // 移除末尾斜杠
  const proxyList = Object.keys(config.server.proxy) //获取代理的路径
  if (proxyList.includes(pathname))
  { //如果请求的路径在里面匹配到 就进行代理
    const proxy = createProxyMiddleware(config.server.proxy[pathname]) //代理
    proxy(req, res)
    return
  }
  console.log(proxyList)
  res.writeHead(200, {
    'Content-Type': 'text/html'
  })
  res.end(html) //返回html  

})

server.listen(80) //监听端口
