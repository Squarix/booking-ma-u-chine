'use strict';
module.exports = (sequelize, DataTypes) => {
  const City = sequelize.define('City', {
    name: DataTypes.STRING,
    country_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Country',
        key: 'id'
      }
    }
  }, {});
  City.associate = function(models) {
    // associations can be defined here
  };
  return City;
};
