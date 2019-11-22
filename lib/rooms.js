const db = require('../models');
const elastic = require('../lib/elasticsearch');

const path = require('path');
const fs = require('fs').promises;

function Room() {

}

Room.prototype.getRoom = async (id) => {
	let room = await db.sequelize.query('select * from get_room_view where id=:id', {
		replacements:
			{
				id: id
			},
		model: db.sequelize.models.User,
		mapToModel: true,
	});
	console.log(room);

	return room[0];
};

Room.prototype.getCategories = async () => {
	let categories = await db.sequelize.query('select * from categories_view', {
		type: db.Sequelize.QueryTypes.SELECT
	});

	return categories;
};

Room.prototype.findRoom = async (roomId, userId) => {
	const room = await db.sequelize.query('select * from findpublicroom(:roomId, :userId)', {
		type: db.Sequelize.QueryTypes.SELECT,
		replacements: {
			roomId: roomId,
			userId: userId,
		}
	});

	return room.length? room[0]: null;
};

Room.prototype.createRoom = async function (params, currentUser) {
	const { roomParams, filters, images, mainImage } = params;

	const filterIds = [];

	const transaction = await db.sequelize.transaction();

	try {
		const city = await db.sequelize.query('select * from findOrCreateCity(:city, :countryId)', {
			transaction: transaction,
			type: db.Sequelize.QueryTypes.SELECT,
			replacements: {
				city: roomParams.city.toUpperCase(),
				countryId: roomParams.countryId,
			}
		});

		const cityId = city[0].findorcreatecity;

		const roomResult = await db.sequelize.query(
			'select * from createroom(:guestsAmount, :size, :address, :cityId, :description, :userId, :todayPrice)', {
				transaction: transaction,
				type: db.Sequelize.QueryTypes.SELECT,
				replacements: {
					guestsAmount: roomParams.guestsAmount,
					size: roomParams.size,
					address: roomParams.address,
					cityId: cityId,
					description: roomParams.description,
					userId: currentUser.id,
					todayPrice: roomParams.todayPrice
				}
			});

		const roomId = roomResult[0].createroom;

		let i = 0;
		const dirPath = path.join(__dirname, '..', 'public', roomId);
		await fs.mkdir(dirPath);
		const uploadedImages = [];
		for (const image of images) {
			const imageData = image.replace(/^data:image\/jpeg;base64,/, '');
			await fs.writeFile(path.join(dirPath, `${i}.jpg`), imageData, 'base64')
			uploadedImages.push(path.join(roomId, `${i}.jpg`))
			i++
		}

		console.log(uploadedImages)



		for (const filter of filters) {
			console.log(filter);
			const newFilter = await db.sequelize.query('select * from createfilters(:filter, :categoryId)', {
				type: db.Sequelize.QueryTypes.SELECT,
				transaction: transaction,
				replacements: {
					filter: filter.filter,
					categoryId: filter.categoryId
				}
			});

			filterIds.push(Number.parseInt(newFilter[0].createfilters));
		}

		await db.sequelize.query('call assignfilters_images(:roomId, ARRAY [:filterIds], ARRAY [:images], :mainImage)', {
			transaction: transaction,
			replacements: {
				roomId: roomId,
				filterIds: filterIds,
				images: uploadedImages,
				mainImage: mainImage
			}
		});

		await transaction.commit();

		const room = await this.findRoom(roomId, currentUser.id);
		await elastic.create('room', roomId, room);
		return { status: 200, message: 'Successfully created! We will process it soon!' }
	} catch (e) {
		console.log(e);
		await transaction.rollback();
		return { status: 400, message: 'Some of your params invalid '}
	}

};
32

Room.prototype.publicRooms = async (params) => {
	//
	// limit
	// order
	// offset
	//
	const rooms = await db.sequelize.query('select * from publicRooms(:limit, :offset, :order)', {
		type: db.Sequelize.QueryTypes.SELECT,
		replacements: {
			limit: Number.parseInt(params.limit) || 20,
			order: params.order || 'todayprice',
			offset: Number.parseInt(params.offset) || 0
		}
	});

	return rooms;
};

Room.prototype.roomBookings = async (roomId) => {
	const bookings = await db.sequelize.query('select * from get_room_booking_view where roomId = :roomId', {
		type: db.Sequelize.QueryTypes.SELECT,
		replacements: {
			roomId: roomId
		}
	})

	return bookings
};


module.exports = Room;
