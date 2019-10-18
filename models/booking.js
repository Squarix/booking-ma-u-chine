'use strict';
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    room_id: {
      type: DataTypes.BIGINT,
      references: {
        model: 'Rooms',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.BIGINT,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    status: DataTypes.STRING,
    arriveDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    price: DataTypes.INTEGER
  }, {});
  Booking.associate = function(models) {
    // associations can be defined here
  };
  return Booking;
};
