const express = require('express');
const router = express.Router();
const User = require('../lib/users');
const Room = require('../lib/rooms');

const roomService = new Room();
const userService = new User();

/* GET users listing. */
router.get('/categories', async (req, res, next) => {
	const categories = await roomService.getCategories();
	res.status(200).json(categories);
});

router.get('/', async (req, res) => {
	const rooms = await roomService.publicRooms(req.query);
	res.status(200).json(rooms);
});

router.get('/:id', userService.authenticate, async (user, req, res, next) => {
	const room = await roomService.findRoom(Number.parseInt(req.params.id), user.id);

	if (room) {
		res.status(200).json(room);
	} else {
		res.status(404).json({message: 'Not found'});
	}
});

router.get('/', async (req, res) => {
	const rooms = await roomService.publicRooms(req.query);
	res.status(200).json(rooms);
});

router.post('/', userService.authenticate, async (user, req, res, next) => {
	console.log(user);
	console.log(req.body);
	if (user) {
		const result = await roomService.createRoom(req.body, user);
		res.status(result.status).json(result)
	} else {
		res.status(401).json({message: 'Not authorized'})
	}
});
module.exports = router;
