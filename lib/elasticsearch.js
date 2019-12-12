const elasticsearch = require('elasticsearch');
const db = require('../models')("user");
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
	const pageParams = query.permit('page').value();
	const page = pageParams.page || 1;

	const matchPhrase = [];
	const filters = query.permit('filters').value();
	if (filters.length) {

		for (const filter of filters) {
			matchPhrase.push({filters: filter})
		}
	}

	const match = [];
	const params = query.permit('guestsamount', 'size', 'address', 'description', 'price').value();
	console.log(params);
	Object.keys(params).map(key => {
		if (key === 'guestsamount' || key === 'size')
			params[key] = Number.parseInt(params[key])
		match.push({ match: { [key]: params[key] }})
	});


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
