const express = require('express')
const app = express()

app.get('*', (req, res, next) => {
  res.send('hello')
})

app.listen(3001, (req, res, next) => {
  console.log('listening on port 3001')
})