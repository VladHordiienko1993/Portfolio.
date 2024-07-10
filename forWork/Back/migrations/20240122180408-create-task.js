'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        field: "user_id",
        references: {
          model: {
            tableName: "users"
          },
          key: "id"
        },
        allowNull: false,
        onDelete: "cascade",
        onUpdate: "restrict"
      },
      body: {
        type: Sequelize.STRING(256),
        allowNull: false
      },
      isDone: {
        type: Sequelize.BOOLEAN,
        field: "is_done",
        defaultValue: false,
      },
      isDelete: {
        type: Sequelize.BOOLEAN,
        field: "is_delete",
        defaultValue: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: "created_at"
      },
      updatedAt: {
        type: Sequelize.DATE,
        field: "updated_at",
        allowNull: false,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tasks');
  }
};