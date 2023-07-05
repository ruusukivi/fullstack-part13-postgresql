const Blog = require('./blog')
const User = require('./user')

Blog.sync().then(async () => {
  const count = await Blog.count();
  if (count === 0) {
    Blog.bulkCreate([{
        author: 'Dan Abramov',
        uri: 'https://overreacted.io/writing-resilient-components/',
        title: 'Writing Resilient Components'
      },
      {
        author: 'Martin Fowler',
        uri: 'https://martinfowler.com/articles/is-quality-worth-cost.html',
        title: 'Is quality worth of cost?'
      },
      {
        author: 'Robert C. Martin',
        uri: 'https://blog.cleancoder.com/uncle-bob/2018/04/13/FPvsOO.html',
        title: 'FP vs. OO List Processing'
      }
    ])
  }
})

User.sync();

module.exports = {
  Blog, User
}