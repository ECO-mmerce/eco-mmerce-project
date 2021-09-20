'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('UsersProducts', 'status');
  },

  down: async (queryInterface, Sequelize) => {},
};
