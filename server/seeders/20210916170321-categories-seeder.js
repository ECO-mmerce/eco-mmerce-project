'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Categories',
      [
        {
          name: 'Skincare',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Cosmetic',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Sanitary',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Hygiene',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {});
  },
};
