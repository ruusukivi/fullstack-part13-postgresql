const Blog = require('./blog')
const User = require('./user')

User.hasMany(Blog)
Blog.belongsTo(User)



/*const addTestUser = async () => {
  const users = await User.count();
  if (users === 0) {
    const testUser = await User.create({
      username: 'test@test.com',
      name: 'Test User'
    });
    testUserId = testUser.id
  }
}
const addBlogs = async () => {
  const count = await Blog.count();
  if (count === 0) {
    Blog.bulkCreate([{
        author: 'Dan Abramov',
        uri: 'https://overreacted.io/writing-resilient-components/',
        title: 'Writing Resilient Components',
        userId: testUserId 
      },
      {
        author: 'Martin Fowler',
        uri: 'https://martinfowler.com/articles/is-quality-worth-cost.html',
        title: 'Is quality worth of cost?',
        userId: testUserId 
      },
      {
        author: 'Robert C. Martin',
        uri: 'https://blog.cleancoder.com/uncle-bob/2018/04/13/FPvsOO.html',
        title: 'FP vs. OO List Processing',
        userId: testUserId 
      }
    ])
  }
}*/

module.exports = {
  Blog,
  User
}