const { DataTypes } = require('sequelize');

module.exports = {
  up: async ({
    context: queryInterface
  }) => {
    await queryInterface.bulkInsert('blogs', [{
        author: 'Dan Abramov',
        uri: 'https://overreacted.io/writing-resilient-components/',
        title: 'Writing Resilient Components',
        user_id : 1,
        year: 2000,
      },
      {
        author: 'Martin Fowler',
        uri: 'https://martinfowler.com/articles/is-quality-worth-cost.html',
        title: 'Is High Quality Software Worth the Cost?',
        user_id: 1,
        year: 2000,
      },
      {
        author: 'Robert C. Martin',
        uri: 'https://blog.cleancoder.com/uncle-bob/2018/04/13/FPvsOO.html',
        title: 'FP vs. OO List Processing',
        user_id : 1,
        year: 2000,
      },
    ])
  },
  down: async ({
    context: queryInterface
  }) => {
    await queryInterface.dropTable('blogs')
  },
}