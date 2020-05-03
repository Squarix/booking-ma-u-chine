import passport from "passport";

import User from "../lib/users";
import Booking from "../lib/bookings";
import express from "express";

const router = express.Router();
const bookingService = new Booking();
const userService = new User();

router.post('/', passport.authenticate('jwt'), async (req, res) => {
	const { user } = req;
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

router.get('/', passport.authenticate('jwt'), async (req, res) => {
	const { user } = req;
	if (user.id) {
		const results = await bookingService.userBookings(user, req.query);
		res.status(200).json(results);
	} else {
		res.status(401).json({message: 'Not authorized'})
	}
});




module.exports = router;

