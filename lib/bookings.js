const db = require('../models')("user");

function Booking() {

}

Booking.prototype.create = async (user, params) => {
	await db.sequelize.query('call createBooking(:userId, :roomId, :startDate, :endDate)', {
		replacements: {
			userId: user.id,
			roomId: params.roomId,
			startDate: params.startDate,
			endDate: params.endDate
		}
	});

	return {status: 200, message: 'Booking has been created'}
};

Booking.prototype.userBookings = async (user, params, offset = 0) => {
	let query;
	console.log(params)
	if (params.startDate && !params.endDate) {
		query = 'select * from get_user_bookings_view where userId=:userId and arrivedate >= :startDate OFFSET :offset'
	} else if (params.endDate && !params.startDate) {
		query = 'select * from get_user_bookings_view where userId=:userId and arrivedate <= :endDate OFFSET :offset'
	} else if (params.endDate && params.startDate) {
		query = 'select * from get_user_bookings_view where userId=:userId and arrivedate between :startDate and :endDate OFFSET :offset'
	} else {
		query = 'select * from get_user_bookings_view where userId=:userId OFFSET :offset'
	}

	const bookings = await db.sequelize.query(query, {
		type: db.Sequelize.QueryTypes.SELECT,
		replacements: {
			startDate: params.startDate? new Date(Number.parseInt(params.startDate)): null,
			endDate: params.endDate? new Date(Number.parseInt(params.endDate)): null,
			userId: user.id,
			offset: offset
		}
	});

	return bookings;
};


module.exports = Booking;
