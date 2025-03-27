const zlib = require('node:zlib')
const http = require('node:http')

const server = http.createServer((req, res) => {
  const txt = 'test11'.repeat(1000);
  // res.setHeader('Content-Encoding', 'gzip')
  res.setHeader('Content-Encoding', 'deflate')
  res.setHeader('Content-Type', 'text/plain;charset=utf-8');
  const result = zlib.deflateSync(txt);
  res.end(result)
})

server.listen(3000, () => {
  console.log('启动成功');
})