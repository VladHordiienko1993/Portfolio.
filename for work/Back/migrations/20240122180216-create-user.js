'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      firstName: {
        type: Sequelize.STRING(64),
        field: "first_name",
        allowNull:false,
      },
      lastName: {
        type: Sequelize.STRING(64),
        field: "last_name",
        allowNull:false,
      },
      isMale: {
        type: Sequelize.BOOLEAN,
        field: "is_male",
      },
      birthday: {
        type: Sequelize.DATEONLY,
      },
      email: {
        type: Sequelize.STRING,
        allowNull:false,
        unique: true,
      },
      password: {
        type: Sequelize.TEXT(32),
        field: "password_hash",
        allowNull:false,
      },
      imgPath: {
        type: Sequelize.TEXT,
        field: "img_path",
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        field: "created_at",
        allowNull: false,

      },
      updatedAt: {
        type: Sequelize.DATE,
        field: "updated_at",
        allowNull: false,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};