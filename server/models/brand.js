'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Brand extends Model {
    static associate(models) {
      models.Brand.belongsToMany(models.Product, {
        through: models.ProductBrand,
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
    }
  );
  return Brand;
};
