'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductsBrand extends Model {
    static associate(models) {}
  }
  ProductsBrand.init(
    {
      ProductId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: 'Product id cannot be empty',
          },
        },
      },
      BrandId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: 'Brand id cannot be empty',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'ProductsBrand',
    }
  );
  return ProductsBrand;
};
