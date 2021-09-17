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
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
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
      addHooks: {
        beforeCreate: (user, _) => {
          if (!user.lastName) user.lastName = user.firstName;
        },
      },
    }
  );
  return User;
};
