// boilerplate code from:
// https://node-postgres.com/guides/project-structure

const { Pool } = require('pg')

// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'qa',
//   password: 'postgres',
//   port: 5432,
// })

const pool = new Pool({
  user: 'postgres',
  host: '18.217.2.172',
  database: 'qa',
  password: 'postgres',
  port: 5432,
})

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  },
}



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