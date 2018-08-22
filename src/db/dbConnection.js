const pgp = require('pg-promise')();
// require('env2')('./config.env');

const herokuDB = {
  host: process.env.HEROKU_HOST,
  user: process.env.HEROKU_USER,
  password: process.env.HEROKU_PW,
  database: process.env.HEROKU_DB,
  ssl: true,
};

const localDB = {
  host: 'localhost',
  port: 5432,
  database: 'emotions',
  user: 'emoadmin',
  password: 'adminemo'
};

// const testDB = {
//   host: 'localhost',
//   port: 5432,
//   database: 'emotions',
//   user: 'emoadmin',
//   password: 'adminemo'
// };

// let DB_URL = process.env.EMO_DB_URL;

// if (!DB_URL) {
//   throw new Error('Environmental variable DB_URL needs to be set');
// }

const connection = process.env.NODE_ENV === 'production' ? herokuDB : localDB;

const db = pgp(connection);
module.exports = db;