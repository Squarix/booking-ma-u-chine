'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Rooms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      guestsAmount: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      size: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING
      },
      city_id: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references: {
          model: 'Cities',
          key: 'id'
        }
      },
      description: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      user_id: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      todayPrice: {
        allowNull: false,
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('Rooms');
  }
};
