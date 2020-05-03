'use strict';
module.exports = (sequelize, DataTypes) => {
  const Country = sequelize.define('Country', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true
    },
    name: DataTypes.STRING,
    code: DataTypes.STRING,
  }, {});
  Country.associate = function(models) {
    // associations can be defined here
  };
  return Country;
};
