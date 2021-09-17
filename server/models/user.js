'use strict';
const { Model } = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
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
        validate: {
          notEmpty: {
            msg: 'First name cannot be empty',
          },
        },
      },
      lastName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
        validate: {
          notEmpty: {
            msg: 'Email cannot be empty',
          },
          isEmail: {
            msg: 'Invalid email format',
          },
        },
      },
      phoneNumber: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: 'Phone number cannot be empty',
          },
        },
      },
      picture: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      role: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
        validate: {
          notEmpty: {
            msg: 'Password cannot be empty',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
      hooks: {
        beforeCreate(instance, options) {
          if (instance.lastName === '') {
            instance.lastName = instance.firstName;
          } else if (instance.firstName === '') {
            instance.firstName = instance.lastName;
          }
          instance.password = hashPassword(instance.password);
        },
      },
    }
  );
  return User;
};
