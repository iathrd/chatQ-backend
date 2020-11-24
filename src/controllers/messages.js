const { Message, ChatList } = require("../models");
const { response } = require("../helpers/response");
const { Op } = require("sequelize");

module.exports = {
  creteMessage: async (req, res) => {
    try {
      let fistSender = 0;
      const { aud } = req.payload;
      const result = await Message.create({ ...req.body, sender: aud });
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
          [Op.or]: [
            {
              receiver: id,
              sender: aud,
            },
            {
              receiver: aud,
              sender: id,
            },
          ],
        },
      });
      if (rows) {
        response(res, "List message", { data: rows });
      } else {
        response(res, "Chat empty", {}, 400);
      }
    } catch (error) {}
  },
  listChat: async (req, res) => {
    try {
    } catch (error) {}
  },
};
