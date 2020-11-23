const auth = require("../controllers/auth");
const route = require("express").Router();
const { upload } = require("../helpers/init_multer");

route.post("/createPhone", auth.createPhone);

module.exports = route;
