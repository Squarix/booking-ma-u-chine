module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Users',
      'type',
      {
        type: Sequelize.ENUM('user', 'moderator'),
        defaultValue: 'user',
        allowNull: false,
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'type');
  }
};

