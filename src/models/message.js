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
      // Message.belongsTo(models.User,{
      //   foreignKeyConstraint:"recipient"
      // })
    }
  };
  Message.init({
    sender: DataTypes.INTEGER,
    recipient: DataTypes.INTEGER,
    content: DataTypes.STRING,
    picture: DataTypes.STRING,
    isLatest: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};