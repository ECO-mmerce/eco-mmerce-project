'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      models.User.belongsToMany(models.Product, {
        through: models.UsersProduct,
      });
      models.User.hasMany(models.UsersProduct);
    }
  }
  User.init(
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
      role: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
