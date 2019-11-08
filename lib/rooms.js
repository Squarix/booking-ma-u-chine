const db = require('../models');

function Room() {

}

Room.prototype.getRoom = async (id) => {
	let room = await db.sequelize.query('select * from viewRoom(:id)', {
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
	let categories = await db.sequelize.query('select * from getcategories()', {
		type: db.Sequelize.QueryTypes.SELECT
	});

	return categories;
};

Room.prototype.createRoom = async (params, currentUser) => {
	const { roomParams, filters } = params;

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

		console.log(cityId);

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

		await db.sequelize.query('call assignFilters(:roomId, ARRAY [:filterIds])', {
			transaction: transaction,
			replacements: {
				roomId: roomId,
				filterIds: filterIds
			}
		});

		await transaction.commit();
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
	const rooms = await db.sequelize.query('select * from publicRooms(:limit, :offset, :order)', {
		type: db.Sequelize.QueryTypes.SELECT,
		replacements: {
			limit: Number.parseInt(params.limit),
			order: params.order,
			offset: Number.parseInt(params.offset)
		}
	});

	return rooms;
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


module.exports = Room;
