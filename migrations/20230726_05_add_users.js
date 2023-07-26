const { DataTypes } = require('sequelize');

module.exports = {
  up: async ({
    context: queryInterface
  }) => {
    await queryInterface.bulkInsert('users', [{
      username: 'test@test.com',
      name: 'test'
    }, ])
  },
  down: async ({
    context: queryInterface
  }) => {
    await queryInterface.dropTable('users')
  },
}
