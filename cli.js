require('dotenv').config()
const { Sequelize, QueryTypes } = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL)

const main = async () => {
  try {
    await sequelize.authenticate()
    const blogs = await sequelize.query("SELECT author, title, likes FROM blogs", { type: QueryTypes.SELECT })
    for (var i = 0; i < blogs.length; i++) {
        const blog = `${i + 1} - ${blogs[i].author}: ${blogs[i].title}, likes: ${blogs[i].likes}`
        console.log(blog);
      }
    sequelize.close()
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

main()