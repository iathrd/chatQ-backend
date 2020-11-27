const auth = require("../controllers/auth");
const route = require("express").Router();
const { upload } = require("../helpers/init_multer");
const {verifyAccessToken} = require('../helpers/jwt_init')

route.post("/createPhone", auth.createPhone);
route.post('/creteUser',verifyAccessToken,upload.single('picture'), auth.createUser)
route.patch('/updateUser',verifyAccessToken,upload.single('picture'),auth.updateUser)
route.delete('/deleteUser',verifyAccessToken,auth.deleteUser)
route.get('/getUser/:id',verifyAccessToken,auth.getUser)

module.exports = route;
