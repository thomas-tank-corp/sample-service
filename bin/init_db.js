const db = require("../db");


console.log("[init_db.js] Initializing database");
console.log(`[init_db.js] CONNECTION_STRING="${process.env.CONNECTION_STRING || ""}"`);

function createDb  () {
  return db.query("SET timezone = 'utc'")
    .then(() => db.query(`CREATE TABLE IF NOT EXISTS products (
      id          SERIAL PRIMARY KEY,
      title       TEXT NOT NULL,
      content     TEXT NULL,
      created_at  TIMESTAMP)`));
}

function delay(timeout) {
   return new Promise((resolve) => {
       setTimeout(resolve, timeout);
   });
}

function dbBackoff() {

  function handleError(error, i) {
    // see https://nodejs.org/docs/latest-v14.x/api/errors.html#errors_class_systemerror
    if (error.code === "ECONNREFUSED" && i < 6) {
      i++;
      console.error(`[init_db.js] Cannot connect to DB, backing off and trying again in ${2**i} seconds`);
      return delay((2**i)*1000).then(() => {
        return createDb().catch((err) => {handleError(err, i)});
      });
    }
    else {
      console.error(error);
      throw error;
    }
  }

  return createDb().catch((err) => handleError(err, 0));
}

dbBackoff()
  .then(() => console.log("[init_db.js] Initializing complete."))
  .catch(() => console.log("[init_db.js] Initializing unsuccessfull."));
