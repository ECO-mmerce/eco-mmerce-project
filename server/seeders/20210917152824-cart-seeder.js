'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Carts',
      [
        {
          ProductId: 1,
          UserId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ProductId: 1,
          UserId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ProductId: 3,
          UserId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ProductId: 9,
          UserId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ProductId: 7,
          UserId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ProductId: 2,
          UserId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ProductId: 2,
          UserId: 4,
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
