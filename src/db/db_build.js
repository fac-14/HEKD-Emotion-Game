const { queryfile } = require('pg-promise');
const path = require('path');
const db = require('./db_connection');

const sql = file => queryfile(path.join(__dirname, file) /*, {minify: true}*/);

const build = sql('./build.sql');

db.query(build)
  .then(res => console.log('db built, res = ', res))
  .catch(err => console.log('db build error = ', err));