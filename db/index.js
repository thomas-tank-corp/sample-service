const pg = require("pg");

let pool = null;

function getInitializedPool() {
  // Only need to set up the pool once: Singleton pattern.
  if (pool) {
    return Promise.resolve(pool);
  }

  // new URL with throw a TypeError if CONNECTION_STRING is not a valid URL
	const connUrl = new URL(process.env.CONNECTION_STRING);
  // Override whatever SSL Node has been setup already
	connUrl.searchParams.delete('sslmode');
  connUrl.searchParams.delete('ssl');

  // USe no-verify as we don't need to worry about certificates. (Best for demos.)
	connUrl.searchParams.set('sslmode', 'no-verify');

  let client = new pg.Client({
    connectionString: connUrl.href,
  });

  return client.connect().then(() => {
    // Success: create pool and return it.
    pool = new pg.Pool({
      connectionString: connUrl.href,
    });
    return client.end().then(() => pool);
  }, () => {
    // Fail: try again without SSL. This simulates sslmode=prefer supported by psql
    client.end();
    connUrl.searchParams.delete('sslmode');
    client = new pg.Client({
      connectionString: connUrl.href,
    });
    return client.connect().then(() => {
      pool = new pg.Pool({
        connectionString: connUrl.href,
      });
      return client.end().then(() => pool);
    });
  });
}


module.exports = {
  query: (text, params) => {
		return getInitializedPool().then((initializedPool) => {
      return initializedPool.query(text, params)
      .catch(e => {
        console.error(`Query failed: ${text}`);
        console.error(e);
        return Promise.reject(e);
      })
    }).catch(e => {
      console.error(`Unable to connect to Database Instance`);
      console.error(e);
      return Promise.reject(e);
    })
  }
};
