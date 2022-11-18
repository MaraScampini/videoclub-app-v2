'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shows extends Model {

    static associate(models) {
      Shows.belongsTo(models.Articles);
    }
  }
  Shows.init({
    id_show: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    title: DataTypes.STRING,
    original_language: DataTypes.STRING,
    genre: DataTypes.STRING,
    description: DataTypes.TEXT,
    poster_path: DataTypes.STRING,
    release_date: DataTypes.DATEONLY,
    next_episode: DataTypes.DATEONLY,
    vote_count: DataTypes.INTEGER,
    vote_average: DataTypes.FLOAT,
    on_theaters: DataTypes.BOOLEAN,
    ArticleIdArticle: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Articles',
        key: 'id_article'
      }
    }
  }, {
    sequelize,
    modelName: 'Shows',
    timestamps: false
  });
  return Shows;
};