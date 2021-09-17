'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Carts',
      [
        {
          ProductId: 2,
          UserId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ProductId: 1,
          UserId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Carts', null, {});
  },
};
