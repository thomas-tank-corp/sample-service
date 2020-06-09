const { Pool } = require("pg");

const pool = new Pool({
  connectionString: `${process.env.CONNECTION_STRING}`
});

module.exports = {
  query: (text, params) => pool
    .query(text, params)
    .catch(e => {
      console.error(`Query failed: ${text}`);
      console.error(e);
      return Promise.reject(e);
    }),
};
