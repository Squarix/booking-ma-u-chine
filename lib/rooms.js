const db = require('../models');

function Room() {

}

Room.prototype.getRoom = async (id) => {
	let room = await db.sequelize.query('select * from viewRoom(:id)', {
		replacements:
			{
				id: id
			},
		model: db.sequelize.models.User,
		mapToModel: true,
	});
	console.log(room);

	return room[0];
};

module.exports = Room;
