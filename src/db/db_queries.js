const dbConnection = require('./dbConnection')
const bcrypt = require('bcryptjs');

const register = (email, name, password, cb) => {
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    dbConnection.query('INSERT INTO users (email, name, pw_hash) VALUES ($1, $2, $3'),
    [email, name, hashedPassword],
    (err, data) => {
      if (err) return cb(err)
    }
  })
}

const findByID

modules.export = register;