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
	const pageParams = query.permit('page').value();
	const page = pageParams.page || 1;

	const params = query.permit('guestsAmount', 'size', 'address', 'description', 'price');
	const response = await client.search({
		index: index,
		size: limit,
		from: (page - 1) * limit,
		body: {
			query: {
				match: params.value()
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
