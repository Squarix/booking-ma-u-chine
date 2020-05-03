const db = require('../models');

function Admin() {

}

Admin.prototype.getPending = async (limit = 20, offset = 0) => {
	let rooms = await db.sequelize.query('select * from get_admin_rooms limit :limit offset :offset', {
		type: db.Sequelize.QueryTypes.SELECT,
		replacements: {
			limit: limit,
			offset: offset
		}
	});

	return rooms;
};

Admin.prototype.updateStatus = async (id, status) => {
	await db.sequelize.query('call update_room_status(:id, :status)', {
			replacements: {
				id: id,
				status: status
			}
	})

	return;
};

module.exports = Admin;
