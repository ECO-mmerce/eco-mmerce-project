'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'UsersProducts',
      [
        {
          ProductId: 1,
          UserId: 1,
          status: 'cart',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('UsersProducts', null, {});
  },
};
