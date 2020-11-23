const route = require('express').Router()
const message = require('../controllers/messages')

route.post('/creteMessage',message.creteMessage)

module.exports = route
