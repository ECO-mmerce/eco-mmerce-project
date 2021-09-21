'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Brands',
      [
        {
          name: 'Oriflame',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Biore',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Wardah',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Sensatia Botanical',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Vaseline',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Garnier',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Rohto',
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
