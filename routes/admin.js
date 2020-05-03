import passport from "passport";

import Admin from "../lib/admin";
import User from "../lib/users";
import express from "express";

const router = express.Router();
const userService = new User();
const adminService = new Admin();

router.use(passport.authenticate('jwt'));
router.use(userService.isUserModerator);

router.get('/', async (req, res, next) => {
	const rooms = await adminService.getPending();
	res.json(rooms)
});

router.put('/rooms/:id', async (req, res, next) => {
	await adminService.updateStatus(req.params.id, req.body.newStatus)
	res.status(200).json({ message: 'ok' })
});

router.get('/bookings', (req, res) => {

});
module.exports = router;
