const express = require('express');
const router = express.Router();
const User = require('../lib/users');
const Room = require('../lib/rooms');

const roomService = new Room();
const userService = new User();

/* GET users listing. */
router.get('/:id', async (req, res, next) => {
	const room = roomService.getRoom(Number.parseInt(req.params.id));
	if (room) {
		res.status(200).json(room);
	} else {
		res.status(404).json({ message: 'Not found' });
	}
});

router.post('/', userService.authenticate, async (user, req, res, next) => {

});
module.exports = router;
