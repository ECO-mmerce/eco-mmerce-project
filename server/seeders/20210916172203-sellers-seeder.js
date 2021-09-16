'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Sellers',
      [
        {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@mail.com',
          phoneNumber: 12345,
          picture: 'picture',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Sellers', null, {});
  },
};
