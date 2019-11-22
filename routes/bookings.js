const express = require('express');
const router = express.Router();

const Booking = require('../lib/bookings');
const bookingService = new Booking();

const User = require('../lib/users');
const userService = new User();

router.post('/', userService.authenticate, async (user, req, res, next) => {
	if (user.id) {
		try {
			const result = await bookingService.create(user, req.body);
			res.status(result.status).json(result);
		} catch (e) {
			res.status(400).json({ message: 'This apartments has been already booked :( '})
		}
	} else {
		res.status(401).json({message: 'Not authorized'})
	}
});

router.get('/', userService.authenticate, async (user, req, res, next) => {
	if (user.id) {
		const results = await bookingService.userBookings(user);
		res.status(200).json(results);
	} else {
		res.status(401).json({message: 'Not authorized'})
	}
});




module.exports = router;

