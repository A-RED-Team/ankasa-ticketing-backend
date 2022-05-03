const { Pool } = require('pg');
const {
  APP_STATUS,
  PG_HOST,
  PG_USER,
  PG_PASSWORD,
  PG_DATABASE,
  PG_PORT,
} = require('../helpers/env');

// const config = {
//   host: PG_HOST,
//   user: PG_USER,
//   password: PG_PASSWORD,
//   database: PG_DATABASE,
//   port: PG_PORT,
// };

// if (APP_STATUS === 'production') {
//   config.ssl = {
//     rejectUnauthorized: true,
//   };
// }

// const db = new Pool(config);

const db = new Pool({
  host: PG_HOST,
  user: PG_USER,
  password: PG_PASSWORD,
  database: PG_DATABASE,
  port: PG_PORT,
});

// check connection
db.connect((err) => {
  if (err) {
    console.log('db error');
    console.log(err.message);
  }
});

module.exports = db;
