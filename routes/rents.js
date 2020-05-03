import Rent from "../lib/rents";
import elasticSearch from "../lib/elasticsearch";
import User from "../lib/users";
import express from "express";
import passport from 'passport';

const router = express.Router();
const userService = new User();
const rentService = new Rent();

router.get('/', passport.authenticate('jwt'), async (req, res, next) => {
	const { user } = req;
	if (user.id) {
		const rents = await rentService.getUserRents(user.id)
		res.status(200).json(rents)
	} else {
		res.status(403).json({message: 'Not authorized'})
	}
});

router.put('/:id', passport.authenticate('jwt'), async (req, res, next) => {
	const { user } = req;
	if (user.id) {
		try {
			const result = await rentService.setStatus(user.id, req.params.id, req.body.newStatus);
			res.status(200).json(result)
		} catch (e) {
			res.status(400).json({message: 'Something went wrong'})
		}
	} else {
		res.status(403).json({message: 'Not authorized'})
	}
});


module.exports = router;
