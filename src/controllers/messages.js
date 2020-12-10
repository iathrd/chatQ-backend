const { Message, User } = require("../models");
const { response } = require("../helpers/response");
const { Op } = require("sequelize");
const { Model } = require("sequelize");
const { pagination } = require("../helpers/pagination");
const io = require('../App')

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
      io.emit(recipientId,{senderId:aud,message:req.body.content})
      result
        ? response(res, "Message sent", {
            data: { ...req.body, senderId: aud, id: result.id },
          })
        : response(res, "Can't send message try again!", {}, false, 400);
    } catch (error) {
      console.log(error);
    }
  },
  listMessage: async (req, res) => {
    const { page = 1, limit = 25 } = req.query;
    const offset = (page - 1) * limit;
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
        order: [["createdAt", "DESC"]],
        limit: +limit,
        offset: +offset,
      });
      if (rows) {
        const pageInfo = pagination(
          `message/chatRoom/${id}`,
          req.query,
          page,
          limit,
          count
        );
        response(res, "List message", { data: rows, pageInfo });
      } else {
        response(res, "Chat empty", {}, 400);
      }
    } catch (error) {}
  },
  listChat: async (req, res) => {
    try {
      const { page = 1, limit = 15 } = req.query;
      const offset = (page - 1) * limit;
      const { aud } = req.payload;
      const { count, rows } = await Message.findAndCountAll({
        subQuery: false,
        include: [
          { model: User, as: "sender" },
          { model: User, as: "recipient" },
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
        order: [["createdAt", "DESC"]],
        limit: +limit,
        offset: +offset,
      });
      if (rows) {
        const pageInfo = pagination(
          "message/chatList",
          req.query,
          page,
          limit,
          count
        );
        response(res, "List chat", { data: rows, pageInfo });
      } else {
        response(res, "Start Chat", {}, 400);
      }
    } catch (error) {
      console.log(error);
    }
  },
};
