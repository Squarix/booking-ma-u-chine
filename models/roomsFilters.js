'use strict';
module.exports = (sequelize, DataTypes) => {
  const roomsFilters = sequelize.define('roomsFilters', {
    roomId: {
      type: DataTypes.BIGINT,
      references: {
        model: 'rooms',
        key: 'id'
      }
    },
    filterId: {
      type: DataTypes.BIGINT,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {});

  return roomsFilters;
};
