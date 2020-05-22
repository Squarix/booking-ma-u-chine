module.exports = (sequelize, DataTypes) => {
  const City = sequelize.define('city', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    countryId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'countries',
        key: 'id'
      }
    }
  }, {});
  City.associate = function(models) {
    City.belongsTo(models.country);
  };
  return City;
};
