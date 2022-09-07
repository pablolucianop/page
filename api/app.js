const express = require('express')
const cors = require('cors')
const indexRouter = require('./routes/v0/index')
const usersRouter = require('./routes/v0/users')
const authenticateRouter = require('./routes/v0/authenticate')
const validateMailRouter = require('./routes/v0/validateMail')
const usersMeRouter = require('./routes/v0/users/me')
const app = express()

const path = require('path')
app.use(express.static(path.join(__dirname, 'build')))

app.get('*', function (req, res) {
  res.sendFile('index.html', {
    root: path.join(__dirname, 'build'),
  })
})

require('dotenv').config()
app.use(cors())
app.use(express.json())
app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/v0/authenticate', authenticateRouter)
app.use('/v0/validateMail', validateMailRouter)
app.use('/v0/users/me', usersMeRouter)

module.exports = app
