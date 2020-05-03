const db = require('../models');

function Country() {

}

Country.prototype.getAll = async () => {
  return db.sequelize.models.Country.findAll();
};

module.exports = Country;
