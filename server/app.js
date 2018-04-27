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

app.use(bodyParser.json())

app.use('/api', indexRouter) //login and registration page
app.use('/api', jwt({secret: config.get('jwt-secret')}), protectedRoutes)  //home and profile page

server.listen(3001)

io.on('connection', (socket) => {
  let rooms = [{roomname:'general',unreadMsgsCount: 0}]  //add msgcount here?
  socket.emit('message', {
    message: 'Welcome to this room'
  })
  socket.on('join', roomInfo => {
    socket.join(roomInfo.room)
    socket.emit('update rooms', rooms)
  })
  socket.on('message', data => {
    io.emit('message', data)
  })
  socket.on('create room', data => {
    console.log('appjs create roomname ' + data.roomname)
    if (!rooms.find(rm => rm.roomname === data.roomname) && data.roomname !== '') {
      rooms.push(data)
      io.emit('update rooms', rooms)
    } else {
      console.log('room name already taken/no room name entered')
    }
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
  console.log('error 404')
  next();
});

module.exports = app;
