const { Message } = require("../models");
const { response } = require("../helpers/response");
const { Op } = require("sequelize");

module.exports = {
  creteMessage: async (req, res) => {
    try {
      const { aud } = req.payload
        // const { content, sender, receiver } = req.body;
      const result = await Message.create({ ...req.body,senderMessage:aud });
      result
        ? response(res, "Message sent", { data: { ...req.body } })
        : response(res, "Can't send message try again!", {}, false, 400);
    } catch (error) {}
  },
  listMessage: async (req, res) => {
    try {
      const { aud } = req.payload;
      const { id } = req.params;
      console.log(aud);
      const { count, rows } = await Message.findAndCountAll({
        where: {
          receiver: id,
          sender: aud,
        },
      });
      if(rows) {
        response(res,'List message',{data:rows})
      } else {
        response(res,'Chat empty',{},400)
      }
    } catch (error) {}
  },
};
