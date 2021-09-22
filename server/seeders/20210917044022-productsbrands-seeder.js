'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'ProductsBrands',
      [
        {
          ProductId: 1,
          BrandId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ProductId: 2,
          BrandId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ProductId: 3,
          BrandId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ProductId: 4,
          BrandId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ProductId: 5,
          BrandId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ProductId: 6,
          BrandId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ProductId: 7,
          BrandId: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ProductId: 8,
          BrandId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ProductId: 9,
          BrandId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ProductsBrands', null, {});
  },
};
