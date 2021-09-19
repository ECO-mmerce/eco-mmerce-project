'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('UsersProducts', 'status');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('UsersProducts', 'status', Sequelize.STRING);
  },
};
