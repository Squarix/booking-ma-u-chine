import {sequelize} from "../models";
import elastic from "./elasticsearch";
import path from "path";
import {promises as fs} from "fs";

function Room() {
  Object.keys(sequelize.models).map(key => {
    this[`${key}Model`] = sequelize.models[key];
  })
}


Room.prototype.getCategories = function () {
  return this.categoryModel.findAll();
};

Room.prototype.findRoom = async function (roomId, userId) {
  return this.roomModel.findOne({
    where: { id: roomId },
    include: ['images', 'filters', 'user', 'city']
  });
};

Room.prototype.updateRoom = async function (roomId, params, currentUser) {
  try {
    await db.sequelize.query('call updateRoom(:id, :address, :todayprice, :userId)', {
      replacements: {id: Number.parseInt(roomId), ...params, userId: currentUser.id}
    })
    return {status: 200, message: 'Updated'}
  } catch (e) {
    console.log(e)
    return {status: 403, message: 'Forbidden'}
  }
}

Room.prototype.createRoom = async function (params, currentUser) {
  const {roomParams, filters, images, mainImage} = params;

  const filterIds = [];

  const transaction = await sequelize.transaction();

  try {
    const country = await this.countryModel.findOne({code: roomParams.countryId})
    const city = await this.cityModel.findOrCreate({
      where: {
        name: roomParams.city.toUpperCase(),
        countryId: country.id
      }, transaction
    })

    const cityId = city[0].id;

    const room = await this.roomModel.create({
      ...roomParams,
      cityId,
      userId: currentUser.id,
    }, {transaction})

    const roomId = room.id;

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
      const newFilter = await this.filterModel.findOrCreate({where: filter, transaction});
      filterIds.push(newFilter[0].id);
    }

    await Promise.all(filterIds.map(filterId => {
      return this.roomsFiltersModel.create({filterId, roomId}, {transaction});
    }))

    await Promise.all(uploadedImages.map(image => this.imageModel.create({
          roomId,
          imagePath: image
        }, {transaction})
    ));
    await transaction.commit();

    // const room = await this.findRoom(roomId, currentUser.id);
    // await elastic.create('room', roomId, room);
    return {status: 200, message: 'Successfully created! We will process it soon!'}
  } catch (e) {
    console.log(e);
    await transaction.rollback();
    return {status: 400, message: 'Some of your params invalid '}
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
