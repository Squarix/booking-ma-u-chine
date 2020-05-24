import {sequelize} from "../models";
import elastic from "./elasticsearch";
import path from "path";
import {promises as fs} from "fs";

export default class Room {
  constructor() {
    Object.keys(sequelize.models).map(key => {
      this[`${key}Model`] = sequelize.models[key];
    })
  }

  getCategories = () => this.categoryModel.findAll();

  findRoom = (roomId, userId) => this.roomModel.findOne({
    where: {id: roomId},
    include: ['images', 'filters', 'user', 'city']
  });

  updateRoom = async (roomId, params, currentUser) => {
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

  createRoom = async (params, currentUser) => {
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

      console.log('MI: ', mainImage);
      await Promise.all(uploadedImages.map((image, index) => this.imageModel.create({
            roomId,
            imagePath: image,
            isMain: mainImage === index
          }, {transaction})
      ));
      await transaction.commit();

      const elasticRoom = await this.findRoom(roomId, currentUser.id);
      await elastic.create('room', roomId, elasticRoom);
      return {status: 200, message: 'Successfully created! We will process it soon!'}
    } catch (e) {
      console.log(e);
      await transaction.rollback();
      return {status: 400, message: 'Some of your params invalid '}
    }
  }

  publicRooms = async ({limit, offset, order}) => this.roomModel.findAll({
    where: { status: 'publicated' },
    offset,
    limit,
    include: [{ association: 'images', where: { isMain: true }, required: false }]
    // order: [order]/
  })

  roomBookings = roomId => this.bookingModel.findAll({where: {roomId}})
}
