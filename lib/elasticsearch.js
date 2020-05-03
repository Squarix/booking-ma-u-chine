const elasticsearch = require('elasticsearch');
const db = require('../models');
const limit = 50;


const client = new elasticsearch.Client({
	host: 'localhost:9200',
	log: 'trace',
	apiVersion: '7.4',
});

async function createDocument(index, id, body) {
	try {
		await client.indices.create({
			index: index,
		})
	} catch (e) {
		console.log('Index already exists')
	}

	console.log(body);
	await client.create({
		index: index,
		id: id,
		body: body
	})

	return true
}

async function searchDocument(index, query) {
	const { page } = query || 1;

	const matchPhrase = [];
	const { filters } = query;
	if (filters.length) {

		for (const filter of filters) {
			matchPhrase.push({filters: filter})
		}
	}

	const match = [];
	Object.keys(query).map(key => {
		if (key === 'guestsamount' || key === 'size')
			query[key] = Number.parseInt(query[key])
		match.push({ match: { [key]: query[key] }})
	});


	const t1 = new Date();
	const response = await client.search({
		index: index,
		size: limit,
		from: (page - 1) * limit,
		body: {
			query: {
				bool: {
					must: match
				}
			}
		}
	});
	const t2 = new Date();
	console.log(t2 - t1)

	return response
}

async function updateDocument(index, id, body) {
	const response = await client.update({
		index: index,
		id: id,
		body: {
			doc: body
		}
	})

	return response
}

module.exports.create = createDocument;
module.exports.search = searchDocument;
