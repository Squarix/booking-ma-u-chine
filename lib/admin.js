import { sequelize } from '../models';

export default class Admin {
	constructor() {
		this.model = sequelize.models.room;
	}

	getPending = (limit = 20, offset = 0) => this.model.findAll({
		limit, offset, include: ['user', 'city'], where: { status: 'pending' }
	});

	updateStatus = async (id, status) => this.model.update({ status }, { where: { id }});
}
