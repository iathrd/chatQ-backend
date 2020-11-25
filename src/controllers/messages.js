const { Message, User } = require("../models");
const { response } = require("../helpers/response");
const { Op } = require("sequelize");

module.exports = {
  creteMessage: async (req, res) => {
    try {
      let fistSender = 0;
      const {recipient} = req.body
      const { aud } = req.payload;
      const { count, rows } = await Message.findAndCountAll({
        where: {
          [Op.or]: [
            {
              recipient,
              sender: aud,
            },
            {
              recipient: aud,
              sender: recipient,
            },
          ],
        },
      });
      if(count > 0) {
        await Message.update({isLatest:0},{where:{id:rows[count-1].id}})
      }
      const result = await Message.create({ ...req.body, sender: aud, isLatest:1 });
      result
        ? response(res, "Message sent", { data: { ...req.body } })
        : response(res, "Can't send message try again!", {}, false, 400);
    } catch (error) {}
  },
  listMessage: async (req, res) => {
    try {
      const { aud } = req.payload;
      const { id } = req.params;
      const { count, rows } = await Message.findAndCountAll({
        where: {
          [Op.or]: [
            {
              recipient: id,
              sender: aud,
            },
            {
              recipient: aud,
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
      const {aud} = req.payload
      const { count, rows } = await Message.findAndCountAll({
        where: {
          [Op.or]: [
            {
              sender: aud,
              isLatest:1
            },
            {
              recipient: aud,
              isLatest:1
            },
          ],
        },
        group:['sender']
      });
      res.send(rows)
    } catch (error) {}
  },
};
