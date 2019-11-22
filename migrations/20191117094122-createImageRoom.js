'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Images', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			roomId: {
				allowNull: false,
				type: Sequelize.BIGINT,
				references: {
					model: 'Rooms',
					key: 'id'
				}
			},
			imagePath: {
				allowNull: false,
				type: Sequelize.STRING
			},
			isMain: {
				type: Sequelize.BOOLEAN,
				defaultValue: false
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
			});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('Images');
	}
};
