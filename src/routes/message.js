const route = require('express').Router()
const message = require('../controllers/messages')
const {verifyAccessToken} = require('../helpers/jwt_init')

route.post('/createMessage',verifyAccessToken,message.creteMessage)

module.exports = route
