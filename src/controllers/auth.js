const { User } = require("../models");
const { response } = require("../helpers/response");
const { UserSchema } = require("../helpers/validation_schema");
const {signAccesToken} = require('../helpers/jwt_init')

module.exports = {
  createPhone: async (req, res) => {
    try {
      const result = await User.create({ ...req.body });
      result
        ? response(res, "Phone created")
        : response(res, "Failed to create", {}, false, 400);
    } catch (error) {}
  },
  createUser: (req, res) => {
    try {
        const {aud} = req.payload
        let data = await UserSchema.validateAsync({...req.body})
      if (req.files !== undefined) {
        let { path } = req.file;
        path = path.replace(/\\/g, "/");
        data = {
            ...data,
            picture: path
        }
      }
      const result = await User.update(data,{where:{id:aud}})
      result 
      ? response(res,'User Created !',{data})
      : response(res,'Failed to create!',{},false,400)

    } catch (error) {
        error.isJoi === true && response(res, error.message, false, 400)
    }
  },
};
