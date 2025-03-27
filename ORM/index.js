import mysql2 from 'mysql2/promise';
import fs from 'fs';
import jsyaml from 'js-yaml';
import express from 'express';

const yaml = fs.readFileSync('./db.config.yaml', 'utf8');
const config = jsyaml.load(yaml);
const sql = await mysql2.createConnection({
  ...config.db
})

const app = express();
app.use(express.json()) // exporss不支持post，需要中间件 解析json数据 

//查询接口 全部
app.get('/', async (req, res) => {
  const [rows] = await sql.query('SELECT * FROM `user`');
  res.send(rows);
})

//单个查询 params
app.get('/user/:id', async (req, res) => {
  const [row] = await sql.query(`select * from user where id = ?`, [req.params.id])
  res.send(row)
})

//新增
app.post('/create', async (req, res) => {
  const { name, age, address } = req.body
  await sql.query(`insert into user(name,age,address) values(?,?,?)`, [name, age, address])
  res.send({ ok: 1 })
})

//修改
app.post('/update', async (req, res) => {
  const { name, age, address, id } = req.body
  await sql.query(`update user set name=?,age=?,address=? where id=?`, [name, age, address, id])
  res.send({ ok: 1 })
})

// 使用 PUT 方法更新用户信息
app.put('/update/:id', async (req, res) => {
  try
  {
    const { id } = req.params;
    const { name, age, address } = req.body;
    // 执行更新操作
    await sql.query(
      `UPDATE user SET name=?, age=?, address=? WHERE id=?`,
      [name, age, address, id]
    );

    res.status(200).json({ ok: 1, message: '用户信息更新成功' });
  } catch (error)
  {
    console.error('更新失败:', error);
    res.status(500).json({ ok: 0, message: '更新用户信息失败' });
  }
});

//删除
app.delete('/delete/:id', async (req, res) => {
  const { id } = req.params
  await sql.query(`delete from user where id=?`, [id])
  res.send({ ok: 1 })
})


const port = 3000;
app.listen(port, () => {
  console.log('server is running');
})
