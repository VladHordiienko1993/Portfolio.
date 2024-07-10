'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ThemeSwitch extends Model {
  
    static associate(models) {}
  }
  ThemeSwitch.init({
    name: { type: DataTypes.STRING(64), allowNull: false, validate: {
      notNull: true,
      notEmpty: true
    } },
    theme:{ type: DataTypes.BOOLEAN, defaultValue: true,}
  }, {
    sequelize,
    modelName: 'ThemeSwitch',
    tableName: 'themeswitches',
    underscored: true,
  });
  return ThemeSwitch;
};
