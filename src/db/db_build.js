const { QueryFile } = require('pg-promise');
const path = require('path');
const db = require('./dbConnection');

const sql = file => QueryFile(path.join(__dirname, file)/*, { minify: true }*/);

const build = sql('./db_build.sql');

db.query(build)
  .then(res => console.log('db built, res = ', res))
  .catch(err => console.log('db build error = ', err));