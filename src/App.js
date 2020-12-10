const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server,{})
module.exports = io
const { APP_PORT } = process.env

app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use('/assets/picture', express.static('assets/picture'))

app.use(cors())


//routes
const authRoute = require('./routes/auth')
const messageRoute = require('./routes/message')


app.use('/auth',authRoute)
app.use('/message',messageRoute)



// Error handler http request
app.use(async (req, res, next) => {
    next(new Error('Not Found'))
  })
  
  // custom error
  app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
      succes: false,
      status: err.status || 500,
      message: err.message
    })
  })
  
  server.listen(APP_PORT, () => {
    console.log(`App listen on port ${APP_PORT}`)
  })