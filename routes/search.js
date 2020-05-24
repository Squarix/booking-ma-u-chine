import express from "express";
import elastic from "../lib/elasticsearch";

const router = express.Router();
/* GET home page. */
router.get('/', async (req, res) => {
	const records = await elastic.search('room', req.query);
	res.status(200).json(records.hits.hits)
});

router.get('/filters', async (req, res) => {

})

module.exports = router;
