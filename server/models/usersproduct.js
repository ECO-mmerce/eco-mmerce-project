'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UsersProduct extends Model {
    static associate(models) {
      models.UsersProduct.belongsTo(models.User);
      models.UsersProduct.belongsTo(models.Product);
    }
  }
  UsersProduct.init(
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
      UserId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: 'User id cannot be empty',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'UsersProduct',
    }
  );
  return UsersProduct;
};
