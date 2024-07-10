"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
 
    static associate(models) {
     User.hasMany(models.Task,{
      foreignKey: "userId"
     });
     User.hasMany(models.Message, { foreignKey: 'userId' });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      token: {
        type: DataTypes.STRING,
      },
      googleId: {type: DataTypes.STRING, allowNull: true,
        field: 'google_id',
        unique: true,
      },
      facebookId:{
        type: DataTypes.STRING,
        field: 'facebook_id',
        unique: true,
        allowNull: true,
      },
      name: { type: DataTypes.STRING(64), allowNull: false, validate: {
        notNull: true,
        notEmpty: true
      } },
      isMale: { type: DataTypes.BOOLEAN, field: "is_male"},
      birthday: { type: DataTypes.DATEONLY, validate: {
        isDate: true,
        customValidator(value) {
          if (new Date(value) > new Date()) {
            throw new Error("invalid date");
          }
        }
      } },
      email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: {
        isEmail: true,
        notNull: true,
        notEmpty: true,
      } },
      password: { type: DataTypes.TEXT(32), allowNull: false, validate: {
        notNull: true,
        notEmpty: true,
      } },
      imgPath: { type: DataTypes.TEXT, field: "img_path", allowNull:true },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      underscored: true,
    }
  );
  return User;
};
