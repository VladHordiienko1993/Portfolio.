'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserChat extends Model {
    static associate(models) {
    
    }
  }
  UserChat.init({
    userId: {
      type: DataTypes.INTEGER,
      field: 'user_id',
      references: {
        model: 'users',
        key: 'id'
      }
    },
    chatId: {
      type: DataTypes.INTEGER,
      field: 'chat_id',
      references: {
        model: 'chats',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'UserChat',
    tableName: 'userchats',
    underscored: true,
  });
  return UserChat;
};