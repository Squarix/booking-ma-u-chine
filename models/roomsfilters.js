'use strict';
module.exports = (sequelize, DataTypes) => {
  const RoomsFilters = sequelize.define('RoomsFilters', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    room_id: {
      type: DataTypes.BIGINT,
      references: {
        model: 'Rooms',
        key: 'id'
      }
    },
    filter_id: {
      type: DataTypes.BIGINT,
      references: {
        model: 'Filters',
        key: 'id'
      }
    }
  }, {});
  RoomsFilters.associate = function(models) {
    // associations can be defined here
  };
  return RoomsFilters;
};
