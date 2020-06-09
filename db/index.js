const { Pool } = require("pg");

const pool = new Pool({
  connectionString: `postgresql://${process.env.CONNECTION_STRING}`
  // user: process.env.DATABASE_USER,
  // host: process.env.DATABASE_HOST,
  // database: process.env.DATABASE_NAME,
  // password: process.env.DATABASE_PASSWORD,
  // port: process.env.DATABASE_PORT,
});

// console.log('pool: ', pool.);

module.exports = {
  query: (text, params) => pool
    .query(text, params)
    .catch(e => {
      console.error(`Query failed: ${text}`);
      console.error(e);
      return Promise.reject(e);
    }),
};
