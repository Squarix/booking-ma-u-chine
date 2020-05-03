import { sequelize } from "../models";
import elastic from "./elasticsearch";
import path from "path";
import { promises as fs } from "fs";

function Room() {
	this.roomModel = sequelize.models.Room;
	this.cityModel = sequelize.models.City;
	this.imageModel = sequelize.models.Image;
	this.filterModel = sequelize.models.Filter;
	this.categoryModel = sequelize.models.Category;
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

Room.prototype.getCategories = function() {
	return this.categoryModel.findAll();
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

Room.prototype.updateRoom = async function (roomId, params, currentUser) {
	try {
		await db.sequelize.query('call updateRoom(:id, :address, :todayprice, :userId)', {
			replacements: { id: Number.parseInt(roomId), ...params, userId: currentUser.id }
		})
		return { status: 200, message: 'Updated' }
	} catch (e) {
		console.log(e)
		return { status: 403, message: 'Forbidden'}
	}
}

Room.prototype.createRoom = async function (params, currentUser) {
	const { roomParams, filters, images, mainImage } = params;

	const filterIds = [];

	const transaction = await sequelize.transaction();

	try {
		const city = await this.cityModel.findOrCreate({ where: {
			name: roomParams.city.toUpperCase(),
				countryId: roomParams.countryId
		}}, { transaction })

		const cityId = city.id;

		const roomResult = await this.roomModel.create({
			guestsAmount: roomParams.guestsAmount,
			size: roomParams.size,
			address: roomParams.address,
			cityId: cityId,
			description: roomParams.description,
			userId: currentUser.id,
			todayPrice: roomParams.todayPrice
		}, { transaction })

		const roomId = roomResult.id;

		let i = 0;
		const dirPath = path.join(__dirname, '..', 'public', roomId);
		await fs.mkdir(dirPath);
		const uploadedImages = [];
		for (const image of images) {
			const imageData = image.replace(/^data:image\/jpeg;base64,/, '');
			await fs.writeFile(path.join(dirPath, `${i}.jpg`), imageData, 'base64')
			uploadedImages.push(path.join(roomId, `${i++}.jpg`))
		}

		for (const filter of filters) {
			console.log(filter);
			const newFilter = await this.filterModel.findOrCreate({ where: filter });
			filterIds.push(newFilter.id);
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

Room.prototype.publicRooms = async (params) => {
	//
	// limit
	// order
	// offset
	//
	const t1 = new Date()
	const rooms = await db.sequelize.query('select * from publicRooms(:limit, :offset, :order)', {
		type: db.Sequelize.QueryTypes.SELECT,
		replacements: {
			limit: Number.parseInt(params.limit) || 20,
			order: params.order || 'todayprice',
			offset: Number.parseInt(params.offset) || 0
		}
	});
	const t2 = new Date()
	console.log(t2 - t1)

	return rooms;
};

Room.prototype.roomBookings = async (roomId) => {
	const bookings = await db.sequelize.query('select * from get_room_booking_view where roomId = :roomId', {
		type: db.Sequelize.QueryTypes.SELECT,
		replacements: {
			roomId: roomId
		}
	});

	return bookings
};


module.exports = Room;
