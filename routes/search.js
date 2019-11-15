const express = require('express');
const router = express.Router();

const elastic = require('../lib/elasticsearch');

/* GET home page. */
router.get('/', async (req, res, next) => {
	const records = await elastic.search('room', req.parameters);
	res.status(200).json(records.hits.hits)
});

module.exports = router;
