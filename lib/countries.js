const db = require('../models');

function Country() {

}

Country.prototype.getAll = async () => {
	let countries = await db.sequelize.query('select * from countries_view', {
		type: db.Sequelize.QueryTypes.SELECT
	});

	return countries;
};

module.exports = Country;
