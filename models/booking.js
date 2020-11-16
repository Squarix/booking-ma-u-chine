'use strict';
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('booking', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    roomId: {
      type: DataTypes.BIGINT,
      references: {
        model: 'rooms',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.BIGINT,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'approving'
    },
    arriveDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    price: DataTypes.INTEGER
  }, {});

  Booking.associate = function(models) {
    Booking.belongsTo(models.user);
    Booking.belongsTo(models.room);
  };

  return Booking;
};
