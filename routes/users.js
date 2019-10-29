const express = require('express');
const router = express.Router();
const User = require('../lib/users');

const userService = new User();

router.get('/:id', async (req, res) => {
	const user = await userService.viewUser(Number.parseInt(req.params.id));
	if (user.email) {
		res.status(200).json(user);
	} else {
		res.status(404).json({message: 'User not found'})
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
