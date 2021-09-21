'use strict';

const { hashPassword } = require('../helpers/bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          firstName: 'Marco',
          lastName: 'Tiger',
          email: 'marco@mail.com',
          phoneNumber: 12345,
          picture:
            'https://ik.imagekit.io/ecohippies/users/marco.jpg?updatedAt=1632229498525',
          role: 'seller',
          password: hashPassword('sellersatu'),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Dita',
          lastName: 'Larasati',
          email: 'dita@mail.com',
          phoneNumber: 12345,
          picture:
            'https://ik.imagekit.io/ecohippies/users/dita.jpg?updatedAt=1632229471999',
          role: 'seller',
          password: hashPassword('sellerdua'),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Baskoro',
          lastName: 'Pandu',
          email: 'pandu@mail.com',
          phoneNumber: 12345,
          picture:
            'https://ik.imagekit.io/ecohippies/users/pandu.jpg?updatedAt=1632229484713',
          role: 'buyer',
          password: hashPassword('buyersatu'),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Nicholas',
          lastName: 'Fortune',
          email: 'nicholas@mail.com',
          phoneNumber: 12345,
          picture:
            'https://ik.imagekit.io/ecohippies/users/nicholas.jpg?updatedAt=1632229459693',
          role: 'buyer',
          password: hashPassword('buyerdua'),
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
