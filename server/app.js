const app = require('express')()
const express = require('express')
const server = require('http').Server(app)
const path = require('path')
const io = require('socket.io')(server)
// const config = require('./config/default.json')
const config = require('config')
const indexRouter = require('./routes/index')
const protectedRoutes = require('./routes/protectedRoutes')
const bodyParser = require('body-parser')
const authorization = require('./middleware/authorization')
const jwt = require('express-jwt')
// const session = require('express-session')
// const logger = require('morgan');

app.use(bodyParser.json())

app.use('/api', jwt({secret: config.get('jwt-secret')}), indexRouter) //login and registration page
// app.use('/api', indexRouter) //login and registration page
// app.use('/api', jwt({secret: config.get('jwt-secret')}), protectedRoutes)  //home and profile page

server.listen(3001)

io.on('connection', (socket) => {
  socket.on('message', data => {
    io.emit('message', data)
  })
})


app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({
  extended: false
}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

module.exports = app;
