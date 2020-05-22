'use strict';
module.exports = (sequelize, DataTypes) => {
  const Country = sequelize.define('country', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    code: DataTypes.STRING,
  }, {});

  Country.associate = function(models) {
    Country.hasMany(models.city);
  };
  return Country;
};
