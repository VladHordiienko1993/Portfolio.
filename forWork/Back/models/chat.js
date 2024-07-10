'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
 
    static associate(models) {
      Chat.belongsTo(models.User, { foreignKey: 'ownerId', as: 'owner' });
      Chat.hasMany(models.Message, { foreignKey: 'chatId' });
      Chat.belongsToMany(models.User, { through: models.UserChat });
    }
  }
  Chat.init({
    ownerId: {
      type: DataTypes.INTEGER,
      field: 'owner_id',
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
    
  
  }, {
    sequelize,
    modelName: 'Chat',
    tableName: 'chats',
    underscored: true  
  });
  return Chat;
};