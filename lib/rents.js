const db = require('../models')("user");

function Rents() {

}

Rents.prototype.getUserRents = async (userId, limit = 20, startDate = null, endDate = null) => {
	const result = await db.sequelize.query('select * from getrents(:userId, :limit, :startDate, :endDate)', {
		replacements: {
			userId: userId,
			limit: limit,
			startDate: startDate,
			endDate: endDate
		},
		type: db.Sequelize.QueryTypes.SELECT
	})

	return result;
};

Rents.prototype.setStatus = async (userId, rentId, newStatus) => {
	await db.sequelize.query('call changeRentStatus(:userId, :rentId, :newStatus)', {
		replacements: {
			userId: userId,
			rentId: rentId,
			newStatus: newStatus
		}
	})
	return {message: 'success'}
};

module.exports = Rents;
