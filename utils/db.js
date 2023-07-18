const Sequelize = require('sequelize')
const { DATABASE_URL } = require('./config')
const { Umzug, SequelizeStorage } = require('umzug')

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
});

const runMigrations = async () => {
  const migrator = new Umzug({
    migrations: {
      glob: '././migrations/*.js',
    },
    storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
    context: sequelize.getQueryInterface(),
    logger: console,
  })
  
  const migrations = await migrator.up()
  console.log('Migrations up to date', {
    files: migrations.map((mig) => mig.name),
  })
}

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    await runMigrations()
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