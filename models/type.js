'use strict';
module.exports = (sequelize, DataTypes) => {
  const Type = sequelize.define('type', {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    name: DataTypes.STRING
  }, {});
  Type.associate = function(models) {
    // associations can be defined here
  };
  return Type;
};
