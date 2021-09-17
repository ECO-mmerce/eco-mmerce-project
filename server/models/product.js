'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      models.Product.belongsTo(models.Category, {
        foreignKey: 'CategoryId',
      });

      models.Product.belongsToMany(models.Brand, {
        through: models.ProductsBrand,
      });

      models.Product.belongsToMany(models.User, {
        through: models.UsersProduct,
      });
      models.Product.hasMany(models.UsersProduct);

      models.Product.belongsToMany(models.User, {
        through: models.Cart,
      });
      models.Product.hasMany(models.Cart);
    }
  }
  Product.init(
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
      price: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: 'Price cannot be empty',
          },
        },
      },
      stock: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: 'Stock cannot be empty',
          },
        },
      },
      weight: {
        allowNull: false,
        type: DataTypes.DOUBLE,
        validate: {
          notEmpty: {
            msg: 'Weight cannot be empty',
          },
        },
      },
      status: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: 'Status cannot be empty',
          },
        },
      },
      description: {
        allowNull: false,
        type: DataTypes.TEXT,
        validate: {
          notEmpty: {
            msg: 'Description cannot be empty',
          },
        },
      },
      ingridient: {
        allowNull: false,
        type: DataTypes.ARRAY(DataTypes.TEXT),
        validate: {
          notEmpty: {
            msg: 'Ingridient cannot be empty',
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
      picture: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: 'Picture cannot be empty',
          },
        },
      },
      CategoryId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: 'Category cannot be empty',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Product',
    }
  );
  return Product;
};
