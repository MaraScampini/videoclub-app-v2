'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Loans extends Model {

    static associate(models) {
      Loans.belongsTo(models.Users)
      Loans.belongsTo(models.Movies)
    }
  }
  Loans.init({
    id_loan: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    date: DataTypes.DATEONLY,
    return_date: DataTypes.DATEONLY,
    end_date: DataTypes.DATEONLY,
    UserIdUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id_user'
      },
    MovieIdMovie: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Movies',
        key: "id_movie"
      }
    }
  }}, 
  {
    sequelize,
    modelName: 'Loans',
    timestamps: false
  });
  return Loans;
};