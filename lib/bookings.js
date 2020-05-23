import {Op} from 'sequelize';
import {sequelize} from '../models';

export default class Booking {
  constructor() {
    this.model = sequelize.models.booking;
    this.roomModel = sequelize.models.room;
  }

  create = async (user, params) => {
    const {roomId, arriveDate, endDate} = params;
    const room = await this.roomModel.findOne({where: {id: roomId}});
    const thisDateBookings = await this.model.findAll({
      where: {
        roomId,
        [Op.or]: {
          arriveDate: {
            [Op.between]: [arriveDate, endDate]
          },
          endDate: {
            [Op.between]: [arriveDate, endDate]
          }
        }
      }
    });

    if (!thisDateBookings.length) {
      const totalDays = daysBetween(arriveDate, endDate);
      const booking = await this.model.create({userId: user.id, ...params, price: room.todayPrice * totalDays});
      return {status: 200, message: 'Booking has been created', booking};
    } else {
      return {status: 400, message: 'Those dates already booked'}
    }
  };

  userBookings = (user, params, offset = 0) => {
    const {startDate, endDate} = params;
    const queryParams = {userId: user.id};
    if (params.startDate) {
      queryParams.arriveDate = {
        [Op.gte]: new Date(Number.parseInt(startDate))
      }
    }

    if (params.endDate) {
      queryParams.endDate = {
        [Op.lte]: new Date(Number.parseInt(endDate))
      }
    }

    return this.model.findAll({
      include: [{association: 'room', include: ['city']}],
      limit: 20,
      offset,
      where: queryParams
    });
  };
}


function daysBetween(date1, date2) {
  const ONE_DAY = 1000 * 60 * 60 * 24;
  const differenceMs = Math.abs(new Date(date1) - new Date(date2));

  return Math.round(differenceMs / ONE_DAY);
}
