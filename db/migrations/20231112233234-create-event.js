'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      guild_id: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      killer_id: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      killer_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      victim_id: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      victim_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      weapon: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Events');
  }
};
