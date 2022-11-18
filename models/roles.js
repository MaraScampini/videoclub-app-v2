'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {

    static associate(models) {
      Roles.hasMany(models.Users)
    }
  }
  Roles.init({
    id_role: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    modelName: 'Roles',
    timestamps: false
  });
  return Roles;
};