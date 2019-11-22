const db = require('../models');

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

Booking.prototype.userBookings = async (user, offset = 0) => {
	const bookings = await db.sequelize.query('select * from get_user_bookings_view where userId=:userId OFFSET :offset', {
		type: db.Sequelize.QueryTypes.SELECT,
		replacements: {
			userId: user.id,
			offset: offset
		}
	});

	return bookings;
};


module.exports = Booking;
