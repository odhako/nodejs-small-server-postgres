const dotenv = require('dotenv');
dotenv.config();

const PSQL_USER = process.env.PSQL_USER;
const PSQL_PASSWORD = process.env.PSQL_PASSWORD;
const PSQL_HOST = process.env.PSQL_HOST;
const PSQL_PORT = process.env.PSQL_PORT;
const PSQL_DATABASE = process.env.PSQL_DATABASE;

const Pool = require('pg').Pool;
const pool = new Pool({
  user: PSQL_USER,
  password: PSQL_PASSWORD,
  host: PSQL_HOST,
  port: PSQL_PORT,
  database: PSQL_DATABASE,

});

const callback = (serverResponse) => (error, dbResponse) => {
  if (error) {
    serverResponse.send(error);
    throw error;
  }
  return serverResponse.send(dbResponse.rows);
};

module.exports = {pool, callback};
