const auth = require("../controllers/auth");
const route = require("express").Router();
const { upload } = require("../helpers/init_multer");
const {verifyAccessToken} = require('../helpers/jwt_init')

route.post("/createPhone", auth.createPhone);
route.post('/creteUser',verifyAccessToken,upload.single('picture'), auth.createUser)

module.exports = route;
