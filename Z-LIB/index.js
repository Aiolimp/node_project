const zlib = require('node:zlib')
const fs = require('node:fs')
// 压缩
// const readStream = fs.createReadStream('./index.txt')
// const writeStream = fs.createWriteStream('./index.txt.gz')
// readStream.pipe(zlib.createGzip()).pipe(writeStream)

// 解压
// const readStream = fs.createReadStream('./index.txt.gz')
// const writeStream = fs.createWriteStream('./index2.txt')
// readStream.pipe(zlib.createGunzip()).pipe(writeStream)


// 无损压缩 deflate 使用 createDeflate方法
// const readStream = fs.createReadStream('index.txt'); // 创建可读流，读取名为 index.txt 的文件
// const writeStream = fs.createWriteStream('index.txt.deflate'); // 创建可写流，将压缩后的数据写入 index.txt.deflate 文件
// readStream.pipe(zlib.createDeflate()).pipe(writeStream);

//解压 deflate

// const readStream = fs.createReadStream('index.txt.deflate')
// const writeStream = fs.createWriteStream('index3.txt')
// readStream.pipe(zlib.createInflate()).pipe(writeStream)
