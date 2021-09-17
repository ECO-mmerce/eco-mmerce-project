'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      models.Product.belongsTo(models.Category, {
        foreignKey: 'CategoryId',
      });

      models.Product.belongsToMany(models.Brand, {
        through: models.ProductsBrand,
      });

      models.Product.belongsToMany(models.User, {
        through: models.UsersProduct,
      });
      models.Product.hasMany(models.UsersProduct);
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
        type: DataTypes.TEXT,
      },
      ingridient: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.TEXT),
      },
      UserId: {
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
