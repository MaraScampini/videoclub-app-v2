'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movies extends Model {

    static associate(models) {
      Movies.hasMany(models.Favorites);
      Movies.hasMany(models.Loans);
    }
  }
  Movies.init({
    id_movie: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    title: DataTypes.STRING,
    original_language: DataTypes.STRING,
    genre: DataTypes.STRING,
    description: DataTypes.TEXT,
    poster_path: DataTypes.STRING,
    release_date: DataTypes.DATEONLY,
    vote_count: DataTypes.INTEGER,
    vote_average: DataTypes.FLOAT,
    on_theaters: DataTypes.BOOLEAN,
    
  }, {
    sequelize,
    modelName: 'Movies',
    timestamps: false
  });
  return Movies;
};