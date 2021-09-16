'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Products',
      [
        {
          name: 'Lacoco',
          price: 325000,
          stock: 1,
          weight: 0.25,
          status: 'Eco',
          description: 'jejujuju',
          ingridient: 'abc def ghi',
          SellerId: 1,
          picture: 'picture',
          CategoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {});
  },
};
