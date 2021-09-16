'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Chat.init(
    {
      BuyerId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      SellerId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      isBuyer: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      message: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Chat',
    }
  );
  return Chat;
};
