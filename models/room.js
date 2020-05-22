'use strict';
module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define('room', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    guestsAmount: DataTypes.INTEGER,
    size: DataTypes.INTEGER,
    address: DataTypes.STRING,
    cityId: {
      type: DataTypes.BIGINT,
      references: {
        model: 'cities',
        key: 'id'
      },
    },
    description: DataTypes.TEXT,
    userId: {
      type: DataTypes.BIGINT,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending'
    },
    todayPrice: DataTypes.INTEGER
  }, {});
  Room.associate = function (models) {
    Room.belongsTo(models.user);
    Room.belongsTo(models.city);
    Room.hasMany(models.image,  { as: 'images' });
    Room.belongsToMany(models.filter, { through: 'roomsFilters', as: 'filters'});
  };

  return Room;
};
