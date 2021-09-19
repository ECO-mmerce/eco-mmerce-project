'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Products',
      [
        {
          name: 'Clay Mask',
          price: 325000,
          stock: 1,
          weight: 0.25,
          status: 'Eco',
          description: 'jejujuju',
          ingridient: [
            'Oxybenzone',
            'Aqua',
            'Sodium Citrate',
            'Citric Acid',
            'Decyl Glucoside',
            'Bentonite',
          ],
          harmfulIngridient: [''],
          UserId: 1, // seller
          picture: 'picture',
          CategoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Serum',
          price: 325000,
          stock: 1,
          weight: 0.25,
          status: 'Eco',
          description: 'jejujuju',
          ingridient: [
            'Carbomer',
            'Tromethamine',
            'Dioscorea Japonica Root Extract',
            'Trehalose',
            'Ethylhexylglycerin',
            'Beta-Glucan',
          ],
          harmfulIngridient: [''],
          UserId: 1, // seller
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
