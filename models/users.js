'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {

    static associate(models) {
      Users.belongsTo(models.Roles);
      Users.hasMany(models.Loans);
    }
  }
  Users.init({
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    date_of_sign_up: DataTypes.DATEONLY,
    deleted: DataTypes.BOOLEAN,
    RoleIdRole: {
      type: DataTypes.STRING,
      allowNull: false,
    references: {
      model: 'Roles',
      key: 'id_role'
    }}
  }, {
    sequelize,
    modelName: 'Users',
    timestamps: false
  });
  return Users;
};