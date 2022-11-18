'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Articles extends Model {

    static associate(models) {
      Articles.hasOne(models.Movies);
      Articles.hasOne(models.Shows);
      Articles.hasOne(models.Loans)
    }
  }
  Articles.init({
    id_article:
    {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    }
  }, {
    sequelize,
    modelName: 'Articles',
    timestamps: false
  });
  return Articles;
};
