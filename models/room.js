'use strict';
module.exports = (sequelize, DataTypes) => {
	const Room = sequelize.define('Room', {
		guestsAmount: DataTypes.INTEGER,
		size: DataTypes.INTEGER,
		address: DataTypes.STRING,
		city_id: {
			type: DataTypes.BIGINT,
			references: {
				model: 'City',
				key: 'id'
			},
		},
		description: DataTypes.TEXT,
		user_id: {
			type: DataTypes.BIGINT,
			references: {
				model: 'User',
				key: 'id'
			}
		},
		status: {
			type: DataTypes.STRING,
			defaultValue: 'pending'
		},
		todayPrice: DataTypes.INTEGER
	}, {});
	Room.associate = function (models) {
		// associations can be defined here
	};

	return Room;
};
