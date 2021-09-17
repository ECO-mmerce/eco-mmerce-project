'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HarmfulIngridient extends Model {
    static associate(models) {}
  }
  HarmfulIngridient.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      hooks: {
        beforeCreate: (ingridient, _) => {
          ingridient.name = ingridient.name.toLowerCase();
        },
      },
      sequelize,
      modelName: 'HarmfulIngridient',
    }
  );
  return HarmfulIngridient;
};
