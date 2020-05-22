'use strict';
module.exports = (sequelize, DataTypes) => {
  const Filter = sequelize.define('filter', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    filter: DataTypes.STRING,
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'categories',
        key: 'id'
      }
    }
  }, {});
  Filter.associate = function(models) {
    Filter.belongsTo(models.category);
    Filter.belongsToMany(models.room, { through: 'roomsFilters', as: 'rooms' });
  };
  return Filter;
};
