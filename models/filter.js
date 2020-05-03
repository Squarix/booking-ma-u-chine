'use strict';
module.exports = (sequelize, DataTypes) => {
  const Filter = sequelize.define('Filter', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true
    },
    name: DataTypes.STRING,
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Category',
        key: 'id'
      }
    }
  }, {});
  Filter.associate = function(models) {
    // associations can be defined here
  };
  return Filter;
};
