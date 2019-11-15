const express = require('express');
const router = express.Router();

const User = require('../lib/users');
const userService = new User();

const elasticSearch = require('../lib/elasticsearch');

const Rent = require('../lib/rents');
const rentService = new Rent();

router.get('/', userService.authenticate, async (user, req, res, next) => {
	if (user.id) {
		const rents = await rentService.getUserRents(user.id)
		res.status(200).json(rents)
	} else {
		res.status(403).json({message: 'Not authorized'})
	}
});

router.put('/:id', userService.authenticate, async (user, req, res, next) => {
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
