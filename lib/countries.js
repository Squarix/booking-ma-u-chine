const db = require('../models');

function Country() {

}

Country.prototype.getAll = async () => {
  return db.sequelize.models.country.findAll();
};

module.exports = Country;
