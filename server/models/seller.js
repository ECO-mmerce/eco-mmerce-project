'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Seller extends Model {
    static associate(models) {
      Seller.hasMany(models.Product, { foreignKey: 'id' });
    }
  }
  Seller.init(
    {
      firstName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      lastName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        isEmail: true,
      },
      phoneNumber: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      picture: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Seller',
    }
  );
  return Seller;
};
