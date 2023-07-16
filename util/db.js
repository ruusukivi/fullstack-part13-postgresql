const Sequelize = require('sequelize')
const {
  DATABASE_URL
} = require('./config')

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
});

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log('Database connected')

  } catch (err) {
    console.log('Connecting database failed')
    return process.exit(1)
  }
  return null
}

module.exports = {
  sequelize,
  connectToDatabase
}