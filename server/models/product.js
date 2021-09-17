'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Category, { foreignKey: 'CategoryId' });
      Product.belongsTo(models.Seller, { foreignKey: 'SellerId' });
    }
  }
  Product.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      price: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      stock: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      weight: {
        allowNull: false,
        type: DataTypes.DOUBLE,
      },
      status: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      description: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      ingridient: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      SellerId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      picture: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      CategoryId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'Product',
    }
  );
  return Product;
};
