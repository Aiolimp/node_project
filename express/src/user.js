import express from "express";

const router = express.Router();

router.post('/login', (req, res) => {
  console.log('1111');

  res.send('login')
})

router.post('/register', (req, res) => {
  res.send('register')
})


export default router;