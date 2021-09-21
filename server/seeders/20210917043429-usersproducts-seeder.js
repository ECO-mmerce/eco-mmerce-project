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
        {
          ProductId: 3,
          UserId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ProductId: 4,
          UserId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ProductId: 5,
          UserId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ProductId: 6,
          UserId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ProductId: 7,
          UserId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ProductId: 8,
          UserId: 2,
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
