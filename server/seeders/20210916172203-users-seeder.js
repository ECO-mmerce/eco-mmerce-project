'use strict';

const { hashPassword } = require('../helpers/bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          firstName: 'seller',
          lastName: 'satu',
          email: 'sellersatu@mail.com',
          phoneNumber: 12345,
          picture: 'picture',
          role: 'seller',
          password: hashPassword('seller'),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'buyer',
          lastName: 'satu',
          email: 'buyersatu@mail.com',
          phoneNumber: 12345,
          picture: 'picture',
          role: 'buyer',
          password: hashPassword('buyer'),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
