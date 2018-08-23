const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');

// create new sequelize object
const sql = new Sequelize(
  'postgres://emoadmin:adminemo@localhost:5432/emotions',
  {
    pool: {
      max: 5,
      min: 0,
      aquire: 30000,
      idle: 1000
    }
  }
);

const user = sql.define(
  'users',
  {
    name: {
      type: Sequelize.STRING,
      unique: false,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: flase
    },
    pw_hash: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    hooks: {
      beforeCreate: user => {
        bcrypt.hash(user.pw_hash, 10, (err, hash) => {
          user.pw_hash = hash;
        })
      }
    }
  }
);

user.protoype.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

sql.sync()
  .then(() => console.log('user table created'))
  .catch(e => console.log(`this error: ${e}`));

module.exports = { user, sql };