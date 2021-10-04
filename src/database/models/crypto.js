'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Cryptos extends Model {

    static init(sequelize) {
      super.init({
        crypto_name: DataTypes.STRING,
        status: DataTypes.BOOLEAN
      }, {
        sequelize,
        modelName: 'cryptos',
      });
    }

    static associate(models) {
      this.belongsToMany(models.Users, {
        foreignKey: 'crypto_id',
        through: 'users-cryptos',
        as: 'users'
      })
    }
  }

  return Cryptos;

};