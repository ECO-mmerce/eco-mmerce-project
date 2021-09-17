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
      },
      UserId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      status: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'UsersProduct',
    }
  );
  return UsersProduct;
};
