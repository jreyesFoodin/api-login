require('dotenv').config({ path: './.env' })

module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      database: process.env.DATABASE,
      user: process.env.USER_DB,
      password: process.env.PASSWORD_DB,
      host: process.env.HOST_DB
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/db/migrations'
    },
    seeds: {
      directory: './src/db/seeds'
    }
  },

  production: {
    client: 'mysql2',
    connection: {
      database: process.env.DATABASE,
      user: process.env.USER_DB,
      password: process.env.PASSWORD_DB,
      host: process.env.HOST_DB
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/db/migrations'
    },
    seeds: {
      directory: './src/db/seeds'
    }
  }
}
