'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'HarmfulIngridients',
      [
        {
          name: 'Oxybenzone',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Octinoxate',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Triclosan',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Parabens',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Methylparaben',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Propylparaben',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Butylparaben',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Ethylparaben',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Silicone',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Siloxanes',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Microplastics',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Microbeads',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Polypropylene',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Polyethylene',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Polyethene Glycol',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Sulfates',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Sodium Lauryl Sulfate',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Sodium Laureth Sulfate',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Lead',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Chlorofluorocarbon',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Hydrochlorofluorocarbons',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Butylated Hydroxytoluene',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Butylated Hydroxyanisole',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Formaldehyde',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Alumunium',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Talc',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Diethanolamine',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Dioxane',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('HarmfulIngridients', null, {});
  },
};
