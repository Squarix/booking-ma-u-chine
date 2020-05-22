'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('image', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    imagePath: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roomId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'rooms',
        key: 'id'
      }
    },
    isMain: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  }, {});
  Image.associate = function(models) {
    Image.belongsTo(models.room);
  };
  return Image;
};
