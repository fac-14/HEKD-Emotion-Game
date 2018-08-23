const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');

// create new sequelize object
const sql = new Sequelize(
  'postgres://emoadmin:adminemo@localhost:5432/emotions'
  //,
  // {
  //   pool: {
  //     max: 5,
  //     min: 0,
  //     aquire: 30000,
  //     idle: 1000
  //   }
  // }
);

const user = sql.define(
  // 'users',
  // {
  //   name: {
  //     type: Sequelize.STRING,
  //     unique: false,
  //     allowNull: false
  //   },
  //   email: {
  //     type: Sequelize.STRING,
  //     unique: true,
  //     allowNull: false
  //   },
  //   pw_hash: {
  //     type: Sequelize.STRING,
  //     allowNull: false
  //   }
  // },
  {
    hooks: {
      beforeCreate: user => {
        bcrypt.hash(user.pw_hash, 10, (err, hash) => {
          user.pw_hash = hash;
        })
      }
    },
    instanceMethods: {
      validPassword: function(pw_hash) {
        return bcrypt.compareSync(pw_hash, this.pw_hash);
      }
    }
  }
);

// user.protoype.validPassword = function (pw_hash) {
//   return bcrypt.compareSync(pw_hash, this.pw_hash);
// };

sql.sync()
  .then(() => console.log('user table created if not existing'))
  .catch(e => console.log(`this error: ${e}`));

module.exports = { user, sql };