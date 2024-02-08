"use strict";
const { Model } = require("sequelize");
const {isBefore} = require("data-fns");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
 
    static associate(models) {
     User.hasMany(models.Task,{
      foreignKey: "userId"
     });
    }
  }
  User.init(
    {
      firstName: { type: DataTypes.STRING(64), field: "first_name", allowNull: false, validate: {
        notNull: true,
        notEmpty: true
      } },
      lastName: { type: DataTypes.STRING(64), field: "last_name", allowNull: false, validate: {
        notNull: true,
        notEmpty: true
      } },
      isMale: { type: DataTypes.BOOLEAN, field: "is_male"},
      birthday: { type: DataTypes.DATEONLY, validate: {
        isDate: true,
        isVlidDate(value){
          if(isBefore(new Date(), new Date(value))){
            throw new Error('check your birthday')
          }
        }
      } },
      email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: {
        isEmail: true,
        notNull: true,
        notEmpty: true,
      } },
      password: { type: DataTypes.TEXT(32), field: "password_hash", allowNull: false, validate: {
        notNull: true,
        notEmpty: true,
      },
    set(v){
      this.setDataValue('password','hash password')
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
