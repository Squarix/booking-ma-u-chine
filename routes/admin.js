const express = require('express');
const router = express.Router();

const User = require('../lib/users');
const userService = new User();

router.use(userService.authenticate);
router.use(userService.isUserModerator);

router.get('/', (req, res, next) => {
	console.log(req.user);
	res.json({message: 'hello'})
});

router.get('/bookings', (req, res) => {

});
module.exports = router;
