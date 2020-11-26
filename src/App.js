const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')

const app = express()
const { APP_PORT } = process.env

app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use('/picture', express.static('assets/picture'))
var dir = path.join(__dirname, '../assets');
app.use(express.static(dir));

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
  
  app.listen(APP_PORT, () => {
    console.log(`App listen on port ${APP_PORT}`)
  })