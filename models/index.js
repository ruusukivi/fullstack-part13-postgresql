const Blog = require('./blog')
const User = require('./user')
const List = require('./list')
const Session = require('./session')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: List, as: 'readings' })
Blog.belongsToMany(User, { through: List, as: 'reading_list' })

module.exports = { Blog, User, List, Session }