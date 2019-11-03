const express = require('express');
const router = express.Router();

const Country = require('../lib/countries');
const countryService = new Country();

/* GET users listing. */
router.get('/', async (req, res) => {
	const countries = await countryService.getAll();
	if (countries) {
		res.status(200).json(countries);
	} else {
		res.status(404).json({ message: 'Countries Not found' });
	}
});

module.exports = router;

