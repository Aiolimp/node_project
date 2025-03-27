const http = require('node:http')
const url = require('node:url')


http.createServer((req, res) => {

  const { pathname } = url.parse(req.url)

  if (pathname === '/api')
  {
    res.end('success proxy')
  }

}).listen(3001, () => {
  console.log('3001 启动成功');

})

