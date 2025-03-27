import fs from 'fs';
import jsyaml from 'js-yaml';
import express from 'express';
import knex from 'knex';

const yaml = fs.readFileSync('./db.config.yaml', 'utf8');
const config = jsyaml.load(yaml);

const db = knex({
  client: "mysql2",
  connection: config.db
})

// db.schema.createTable('list', (table) => {
//   table.increments('id') //id自增
//   table.integer('age') //age 整数
//   table.string('name') //name 字符串
//   table.string('hobby') //hobby 字符串
//   table.timestamps(true, true) //创建时间和更新时间
// }).then(() => {
//   console.log('创建成功')
// })

// 你可以使用事务来确保一组数据库操作的原子性，即要么全部成功提交，要么全部回滚

// 例如A给B转钱，需要两条语句，如果A语句成功了，B语句因为一些场景失败了，那这钱就丢了，所以事务就是为了解决这个问题，要么都成功，要么都回滚，保证金钱不会丢失。
db.transaction(async (trx) => {
  try
  {
    await trx('list').update({ money: -100 }).where({ id: 1 }) //A
    await trx('list').update({ money: +100 }).where({ id: 2 }) //B
    await trx.commit() //提交事务
  }
  catch (err)
  {
    await trx.rollback() //回滚事务
  }

})


const app = express();
app.use(express.json()) // exporss不支持post，需要中间件 解析json数据 

//查询接口 全部
app.get('/', async (req, res) => {
  const rows = await db('list').select('*')
  const total = await db('list').count('* as total')
  res.json({
    ok: 1,
    data: rows,
    total: total[0].total
  })
})

//单个查询 params
app.get('/user/:id', async (req, res) => {
  const row = await db('list').select('*').where({
    id: req.params.id
  })
  res.send(row)
})

//新增
app.post('/create', async (req, res) => {
  const { name, age, hobby } = req.body
  await db('list').insert({
    name,
    age,
    hobby
  })
  res.send({ ok: 1 })
})

// //修改
app.post('/update', async (req, res) => {
  const { name, age, hobby, id } = req.body
  await db('list').update({
    name,
    age,
    hobby
  }).where({
    id
  })
  res.send({ ok: 1 })
})

// 使用 PUT 方法更新用户信息
app.put('/update/:id', async (req, res) => {
  try
  {
    const { id } = req.params;
    const { name, age, hobby } = req.body;
    // 执行更新操作
    await db('list').update({
      name,
      age,
      hobby
    }).where({ id });

    res.status(200).json({ ok: 1, message: '用户信息更新成功' });
  } catch (error)
  {
    console.error('更新失败:', error);
    res.status(500).json({ ok: 0, message: '更新用户信息失败' });
  }
});

//删除
app.delete('/delete/:id', async (req, res) => {
  const info = await db('list').delete().where({ id: req.body.id })
  res.json({
    code: 200,
    data: info
  })
})


const port = 3000;
app.listen(port, () => {
  console.log('server is running');
})
