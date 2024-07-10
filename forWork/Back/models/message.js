// models/userchat.js
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
  
    static associate(models) {
      Message.belongsTo(models.User, { foreignKey: 'userId', as: 'sender' });
      Message.belongsTo(models.Chat, { foreignKey: 'chatId', as: 'chat' });
    }
  }
  Message.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
  },
  userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: 'users',
          key: 'id'
      }
  },
  chatId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: 'chats',
          key: 'id'
      }
  },
  text: {
      type: DataTypes.STRING(300),
      allowNull: false
  }

  }, {
    sequelize,
    modelName: 'Message',
    tableName: 'messages',
    underscored: true,
  });
  return Message;
};