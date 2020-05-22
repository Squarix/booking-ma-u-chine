'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rates = sequelize.define('rates', {
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
    stars: DataTypes.INTEGER,
    comment: DataTypes.TEXT
  }, {});
  Rates.associate = function(models) {
    Rates.belongsTo(models.user);
    Rates.belongsTo(models.room);
  };
  return Rates;
};
