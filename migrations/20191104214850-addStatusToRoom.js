'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.addColumn('Rooms', 'status', {
			type:  Sequelize.STRING,
			defaultValue: 'pending',
			allowNull: true
		})
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.removeColumn('Rooms', 'status')
	}
};
