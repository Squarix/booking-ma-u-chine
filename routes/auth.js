const express = require('express');
const router = express.Router();
const User = require('../lib/users');

router.post('/authenticate', async (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;

	if (email && password) {
		const user = new User();
		const result = await user.loginUser(email, password);
		res.status(result.status).json(result);
	} else {
		res.status(400).json({ message: 'Email or password not set' });
	}
});

router.post('/register', async (req, res) => {
	const user = new User();
	const result = await user.registerUser(req.body.email, req.body.password);
	res.status(result.status).json(result);
});

module.exports = router;
