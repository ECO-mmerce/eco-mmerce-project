'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Brand extends Model {
    static associate(models) {
      Brand.belongsToMany(models.Product, {
        through: models.ProductsBrand,
        foreignKey: 'BrandId',
      });
    }
  }
  Brand.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Brand',
    }
  );
  return Brand;
};
