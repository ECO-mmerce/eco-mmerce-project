'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Brands',
      [
        {
          name: 'Sensatia Botanicals',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Biore',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Lacoco',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Some By Mi',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Brands', null, {});
  },
};
