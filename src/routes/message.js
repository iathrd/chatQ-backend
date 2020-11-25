const route = require('express').Router()
const message = require('../controllers/messages')
const {verifyAccessToken} = require('../helpers/jwt_init')

route.post('/createMessage',verifyAccessToken,message.creteMessage)
route.get('/chatRoom/:id',verifyAccessToken,message.listMessage)
route.get('/chatList',verifyAccessToken,message.listChat)

module.exports = route
