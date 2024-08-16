'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
   await queryInterface.changeColumn('Todos', 'status', {
      type: Sequelize.ENUM('todo', 'in progress', 'done'),
      allowNull: false,
      defaultValue: 'todo'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Todos', 'status', {
      type: Sequelize.ENUM('todo', 'done'),
      allowNull: false,
      defaultValue: 'todo'
    });
  }
};