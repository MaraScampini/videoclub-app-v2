"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Favorites extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Favorites.belongsTo(models.Users);
      Favorites.belongsTo(models.Movies);
    }
  }
  Favorites.init(
    {
      id_fav: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      date_faved: DataTypes.DATEONLY,
      UserIdUser: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id_user",
        },
        MovieIdMovie: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "Movies",
            key: "id_movie",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Favorites",
      timestamps: false
    }
  );
  return Favorites;
};
