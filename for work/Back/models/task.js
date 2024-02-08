'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {

    static associate(models) {
      Task.belongsTo(models.User, {
        foreignKey: "userId"
      })
    }
  }
  Task.init({
    body: {type: DataTypes.STRING(256), allowNull: false, validate:{
      notEmpty: true,
      notNull: true
    }},
    isDone:{type: DataTypes.BOOLEAN, field: "is_done"},
    isDelete: {type: DataTypes.BOOLEAN,field: "is_delete"}
  }, {
    sequelize,
    modelName: 'Task',
    tableName: 'tasks',
    underscored: true
  });
  return Task;
};