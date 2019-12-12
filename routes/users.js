const express = require('express');
const router = express.Router();
const User = require('../lib/users');

const userService = new User();

router.get('/me', userService.authenticate, async (user, req, res, next) => {
	if (user.id) {
		try {
			const viewUser = await userService.viewUser(Number.parseInt(user.id));
			res.status(200).json(viewUser)
		} catch (e) {
			res.status(400).json({message: 'Oops... something went wrong'})
		}
	} else {
		res.status(403).json({message: 'Not authorized'})
	}
});

router.get('/:id', async (req, res) => {
	const user = await userService.viewUser(Number.parseInt(req.params.id));
	if (user.email) {
		res.status(200).json(user);
	} else {
		res.status(404).json({message: 'User not found'})
	}
});


router.put('/:id', userService.authenticate, async (user, req, res, next) => {
	console.log(user.id)
	if (user.id && user.id === Number.parseInt(req.params.id)) {
		try {
			await userService.updateProfile(user, req.body.params)
			res.status(200).json({message: 'Profile updated'})
		} catch (e) {
			res.status(400).json({message: 'Oops... something went wrong'})
		}
	} else {
		res.status(403).json({message: 'Not authorized'})
	}
});

router.get('/:id/rooms', async (req, res) => {
	// get rooms by user id
	// limit 20 for example
	// return it
});

router.post('', async (req, res) => {

});

module.exports = router;
