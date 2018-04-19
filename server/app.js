const app = require('express')()
const express = require('express');
const server = require('http').Server(app)
// const cookieParser = require('cookie-parser');
const path = require('path')
const io = require('socket.io')(server)
const config = require('./config/default.json')
const indexRouter = require('./routes/index');
const session = require('express-session')
// const logger = require('morgan');

server.listen(3001)

io.on('connection', (socket) => {
  socket.on('message', data => {
    io.emit('message', data)
  })
})

//how to set up view engine

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: config.session.secret,
  resave: true,
  saveUninitialized: false,
  cookie: {secure: false}
}))

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

module.exports = app;
