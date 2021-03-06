'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Message.belongsTo(models.User,{
        as:"sender",
        foreignKey:"senderId"
      })
      Message.belongsTo(models.User,{
        as:"recipient",
        foreignKey:"recipientId"
      })
    }
  };
  Message.init({
    senderId: DataTypes.INTEGER,
    recipientId: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    picture: DataTypes.STRING,
    isLatest: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};