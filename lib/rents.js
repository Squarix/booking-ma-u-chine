import {sequelize} from '../models';
import {Op} from "sequelize";

export default class Rents {
  constructor() {
    this.model = sequelize.models.booking;
  }

  getUserRents = (userId, limit = 20, startDate = null, endDate = null) => {
    const query = {};
    if (startDate) {
      query.startDate = {
        [Op.gte]: new Date(Number.parseInt(startDate))
      };
    }
    if (endDate) {
      query.endDate = {
        [Op.lte]: new Date(Number.parseInt(endDate))
      };
    }


    return this.model.findAll({
      where: {...query},
      include: ['user', {association: 'room', include: ['city'], where: {userId}}],
      limit
    })
  }

  setStatus = async (userId, id, status) => {
    await this.model.update({
      status
    }, {
      where: {
        id
      }
    });

    return {message: 'success'}
  }
}
