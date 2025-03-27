import express from 'express';
import User from './src/user.js';
import loggerMiddleware from './middleware/logger.js';
const app = express()
app.use(loggerMiddleware)
app.use(express.json())
app.use('/user', User)
app.get('/get', (req, res) => {
  console.log(req.query);

  res.send('Hello World!')
})

app.post('/post', (req, res) => {
  console.log(req.body);

  res.send('Got a POST request')
})

app.get('/get/:id', (req, res) => {
  console.log(req.params);

  res.send('Got a POST request')
})


app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})