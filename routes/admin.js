const express = require('express');
const router = express.Router();

const User = require('../lib/users');
const userService = new User();

const Admin = require('../lib/admin');
const adminService = new Admin();

router.use(userService.authenticate);
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
