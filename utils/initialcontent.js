const Blog = require('../models/blog')
const User = require('../models/user')

const addTestUser = async () => {
    const testUser = await User.create({
      username: 'test@test.com',
      name: 'Test User'
    });
}
const addBlogs = async () => {
    Blog.bulkCreate([{
        author: 'Dan Abramov',
        uri: 'https://overreacted.io/writing-resilient-components/',
        title: 'Writing Resilient Components',
        userId: 1 
      },
      {
        author: 'Martin Fowler',
        uri: 'https://martinfowler.com/articles/is-quality-worth-cost.html',
        title: 'Is quality worth of cost?',
        userId: 1 
      },
      {
        author: 'Robert C. Martin',
        uri: 'https://blog.cleancoder.com/uncle-bob/2018/04/13/FPvsOO.html',
        title: 'FP vs. OO List Processing',
        userId: 1
      }
    ])
}

module.exports = {
  addBlogs, addTestUser
}