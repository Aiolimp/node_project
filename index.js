const fs = require('node:fs')

let verse = [
  '待到秋来九月八',
  '我花开后百花杀',
  '冲天香阵透长安',
  '满城尽带黄金甲'
]

let writeStream = fs.createWriteStream('index.txt')

verse.forEach(item => {
  writeStream.write(item + '\n')
})

writeStream.end()

writeStream.on('finish', () => {
  console.log('写入完成')
})
