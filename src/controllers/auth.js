const { User } = require("../models");
const { response } = require("../helpers/response");
const { UserSchema } = require("../helpers/validation_schema");
const { signAccesToken } = require("../helpers/jwt_init");

module.exports = {
  createPhone: async (req, res) => {
    try {
      const { phoneNumber } = req.body;
      const find = await User.findOne({ where: { phoneNumber } });
      if (find) {
        response(res, "Phone number already registered!", {}, false, 400);
      }
      const result = await User.create({ ...req.body });
      if (result) {
        const token = await signAccesToken(result.id);
        response(res, "Phone Created", { token });
      } else {
        response(res, "Failed to create", {}, false, 400);
      }
    } catch (error) {}
  },
  createUser: async (req, res) => {
    try {
      const { aud } = req.payload;
      let data = await UserSchema.validateAsync({ ...req.body });
      if (req.file !== undefined) {
        let { path } = req.file;
        path = path.replace(/\\/g, "/");
        data = {
          ...data,
          avatar: path,
        };
      }
      const result = await User.update(data, { where: { id: aud } });
      result
        ? response(res, "User Created !", { data })
        : response(res, "Failed to create!", {}, false, 400);
    } catch (error) {
      error.isJoi === true && response(res, error.message, false, 400);
    }
  },
  updateUser: async (req,res)=> {
      try {
        const { aud } = req.payload;
        let data = await UserSchema.validateAsync({ ...req.body });
        if (req.file !== undefined) {
          let { path } = req.file;
          path = path.replace(/\\/g, "/");
          data = {
            ...data,
            avatar: path,
          };
        }
        const result = await User.update(data, { where: { id: aud } });
        result
          ? response(res, "Sucssesfullt Updated!", { data })
          : response(res, "Failed to Updated!", {}, false, 400);
      } catch (error) {
        error.isJoi === true && response(res, error.message, false, 400);  
      }
  },
  deleteUser: async (req,res)=>{
      try {
          const {aud} = req.payload;
          const result = await User.destroy({
              where:{
                  id:aud
              }
          })
          result
          ? response(res,'Succesfuly deleted')
          : response(res,'Failed to deleted',{},false,400)
      } catch (error) {
          
      }
  }
};
