'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Categories',
      [
        {
          name: 'Hair',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Face',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Body',
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
