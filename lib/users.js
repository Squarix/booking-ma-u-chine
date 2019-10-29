const db = require('../models');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


function User() {
}

User.prototype.registerUser = async (email, password) => {
	try {
		if (!(email && password)) {
			throw 'Email or password is not set';
		}
		if (password.length < 6) {
			throw 'Password is too short';
		}
		if (!validateEmail(email)) {
			throw 'Email address is incorrect';
		}

		let user = await db.sequelize.query('select * from registeruser(:email, :password)', {
			replacements:
				{
					password: cryptPassword(password),
					email: email
				},
			model: db.sequelize.models.User,
			mapToModel: true,
		});
		user = user[0];


		return {token: await signJWT(user), status: 200};
	} catch (e) {
		if (e.name === 'SQL') {
			e = 'User already exists';
		}
		return {message: e, status: 400};
	}
};

User.prototype.loginUser = async (email, password) => {
	try {
		let user = await db.sequelize.query('select * from loginuser(:email, :password)', {
			replacements:
				{
					password: cryptPassword(password),
					email: email
				},
			model: db.sequelize.models.User,
			mapToModel: true,
		});
		console.log(user);

		user = user[0];

		const token = await signJWT(user);
		return {token: token, status: 200};

	} catch (e) {
		return {message: e, status: 400};
	}
};

User.prototype.viewUser = async (id) => {
	let user = await db.sequelize.query('select * from viewUser(:id)', {
		replacements: {
			id: id
		},
		model: db.sequelize.models.User,
		mapToModel: true,
	});
	console.log(user);

	return user[0];
};

User.prototype.authenticate = async (req, res, next) => {
	const token = req.get('Authorization');
	const jwtDecoded = await verifyJWT(token);
	if (jwtDecoded) {
		const user = await db.sequelize.query('select * from getUser(:id)', {
			replacements: {
				id: Number.parseInt(req.params.id)
			},
			model: db.sequelize.models.User,
			mapToModel: true,
		});

		console.log('AUTH: USER: ' + user);

		if (user[0]) {
			next(user);
		} else {
			res.status(404).json({message: 'User not found'});
		}
	} else {
		res.status(403).json({message: 'Auth token expired or incorrect'})
	}
};

function validateEmail(email) {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}

function signJWT(payload) {
	return new Promise((resolve, reject) => {
		jwt.sign(payload.toJSON(), 'PozhiloyPrivateKey',
			{algorithm: 'HS256', expiresIn: 60 * 60 * 24 * 30}, function (err, token) {
				if (err)
					reject(err);
				else
					resolve(token);
			});
	});
}

function verifyJWT(token) {
	return new Promise(((resolve, reject) => {
		jwt.verify(token, 'PozhiloyPrivateKey', (err, decode) => {
			if (err)
				reject(err);
			else
				resolve(decode);
		})
	}));
}

function cryptPassword(password) {
	let sha256 = crypto.createHash('sha256');
	sha256.update(password, 'utf8');
	const result = sha256.digest('base64');
	return result;
}

module.exports = User;
