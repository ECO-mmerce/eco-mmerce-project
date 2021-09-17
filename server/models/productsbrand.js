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
      },
      BrandId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'ProductsBrand',
    }
  );
  return ProductsBrand;
};
