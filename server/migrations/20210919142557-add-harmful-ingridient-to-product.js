'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Products', 'harmfulIngridient', {
      allowNull: false,
      type: Sequelize.ARRAY(Sequelize.TEXT),
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Products', 'harmfulIngridient');
  },
};
