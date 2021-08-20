const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    database: 'numerics_db',
    password: 'postgres',
    host: 'localhost',
    port: 2233
    })

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  },
}