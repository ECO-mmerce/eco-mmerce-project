'use strict';
const { Model } = require('sequelize');
const _ = require('lodash');
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
        validate: {
          notEmpty: {
            msg: 'Name cannot be empty',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Brand',
      addHooks: {
        beforeCreate: (brand, _) => {
          brand.name = brand.name
            .split(' ')
            .map((el) => _.capitalize(el))
            .join(' ');
        },
      },
    }
  );
  return Brand;
};
