const { Message, User } = require("../models");
const { response } = require("../helpers/response");
const { Op } = require("sequelize");
const { Model } = require("sequelize");

module.exports = {
  creteMessage: async (req, res) => {
    try {
      const { recipientId } = req.body;
      const { aud } = req.payload;
      const { count, rows } = await Message.findAndCountAll({
        where: {
          [Op.or]: [
            {
              recipientId,
              senderId: aud,
            },
            {
              recipientId: aud,
              senderId: recipientId,
            },
          ],
        },
      });
      if (count > 0) {
        await Message.update(
          { isLatest: 0 },
          { where: { id: rows[count - 1].id } }
        );
      }
      const result = await Message.create({
        ...req.body,
        senderId: aud,
        isLatest: 1,
      });
      result
        ? response(res, "Message sent", { data: { ...req.body } })
        : response(res, "Can't send message try again!", {}, false, 400);
    } catch (error) {
      console.log(error)
    }
  },
  listMessage: async (req, res) => {
    try {
      const { aud } = req.payload;
      const { id } = req.params;
      const { count, rows } = await Message.findAndCountAll({
        where: {
          [Op.or]: [
            {
              recipientId: id,
              senderId: aud,
            },
            {
              recipientId: aud,
              senderId: id,
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
      const { aud } = req.payload;
      const data = await Message.findAll({
        subQuery: false,
        include: [
          { model: User, as: "sender"},
          { model: User, as: "recipient"},
        ],
        where: {
          [Op.or]: [
            {
              senderId: aud,
              isLatest: 1,
            },
            {
              recipientId: aud,
              isLatest: 1,
            },
          ],
        },
      });
      response(res,'List chat',{data:data})
    } catch (error) {
      console.log(error);
    }
  },
};
