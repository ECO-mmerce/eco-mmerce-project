'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    static associate(models) {
      models.History.belongsTo(models.User);
      models.History.belongsTo(models.Product);
    }
  }
  History.init(
    {
      UserId: DataTypes.INTEGER,
      ProductId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'History',
    }
  );
  return History;
};
