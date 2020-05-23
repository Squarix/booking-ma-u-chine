import { sequelize } from '../models';

export default class Admin {
	constructor(props) {
		this.model = sequelize.models.room;
	}

	getPending = (limit = 20, offset = 0) => this.model.findAll({ limit, offset })

	updateStatus = async (id, status) => this.model.update({ status }, { where: { id }})
}
