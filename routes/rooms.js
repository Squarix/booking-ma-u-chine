import express from "express";
import elastic from "../lib/elasticsearch";
import User from "../lib/users";
import Room from "../lib/rooms";
import passport from 'passport';

const router = express.Router();
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

router.get('/:id', passport.authenticate('jwt'), async (req, res, next) => {
	const { user } = req;
	const room = await roomService.findRoom(Number.parseInt(req.params.id), user.id);

	if (room) {
		res.status(200).json(room);
	} else {
		res.status(404).json({message: 'Not found'});
	}
});

router.put('/:id', passport.authenticate('jwt'), async (req, res, next) => {
	let response;
	const { user } = req;
	console.log(user)
	if (user.id) {
		response = await roomService.updateRoom(req.params.id, req.body, user)
	} else {
		response = {status: 401, message: 'Not authorized'}
	}

	res.status(response.status).json(response);
});

router.get('/:id/bookings', async (req, res) => {
	const bookings = await roomService.roomBookings(req.params.id);
	res.status(200).json(bookings);
});

router.get('/', async (req, res) => {
	const rooms = await roomService.publicRooms(req.query);
	res.status(200).json(rooms);
});

router.post('/', passport.authenticate('jwt'), async (req, res, next) => {
	const { user } = req;
	if (user) {
		const result = await roomService.createRoom(req.body, user);
		res.status(result.status).json(result)
	} else {
		res.status(401).json({message: 'Not authorized'})
	}
});

module.exports = router;
