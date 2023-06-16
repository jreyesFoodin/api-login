
require('dotenv').config({path: '../../.env'})
const USER_DB = process.env.USER_DB
const PASSWORD_DB = process.env.PASSWORD_DB
const DATABASE = process.env.DATABASE
const HOST_DB = process.env.HOST_DB

module.exports = require('knex')({
  client: 'mysql2',
  connection: {
    database: DATABASE,
    user: USER_DB,
    password: PASSWORD_DB,
    host: HOST_DB
  }
})
