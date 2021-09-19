'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'UsersProducts',
      [
        {
          ProductId: 1,
          UserId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ProductId: 2,
          UserId: 1,
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
