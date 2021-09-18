'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    static associate(models) {
      models.Chat.belongsTo(models.User, { foreignKey: 'BuyerId' });
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
      message: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      fullName: {
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
