// boilerplate code from:
// https://node-postgres.com/guides/project-structure

const { Pool } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'qa',
  password: 'postgres',
  port: 5432,
})

pool.query('SELECT * FROM questions LIMIT 1', (err, res) => {
  console.log(err, res)
  pool.end()
})

// pool.query('SELECT * FROM pg_catalog.pg_tables ', (err, res) => {
//   console.log(err, res)
//   pool.end()
// })


// show all tables
// SELECT *
// FROM pg_catalog.pg_tables
// WHERE schemaname != 'pg_catalog' AND
//     schemaname != 'information_schema';

// module.exports = {
//   query: (text, params, callback) => {
//     return pool.query(text, params, callback)
//   },
// }