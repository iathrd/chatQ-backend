const { Message } = require("../models");
const { response } = require("../helpers/response");

module.exports = {
  creteMessage: async (req, res) => {
    try {
        // const { aud } = req.payload
    //   const { content, sender, receiver } = req.body;
      const result = await Message.create({...req.body})
      result
      ? response(res,'Message sent',{data:{...req.body}})
      : response(res,"Can't send message try again!",{},false,400)
    } catch (error) {}
  },
};
