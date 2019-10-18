'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rates = sequelize.define('Rates', {
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
    stars: DataTypes.INTEGER,
    comment: DataTypes.TEXT
  }, {});
  Rates.associate = function(models) {
    // associations can be defined here
  };
  return Rates;
};
