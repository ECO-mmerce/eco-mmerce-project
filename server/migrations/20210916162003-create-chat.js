'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Chats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      BuyerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Buyers',
          key: 'id',
        },
      },
      SellerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Sellers',
          key: 'id',
        },
      },
      isBuyer: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      message: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Chats');
  },
};
