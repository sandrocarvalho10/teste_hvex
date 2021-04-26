const db = require('../controller/db')

const Users = db.sequelize.define('users', {
  username: {
    type: db.Sequelize.STRING(80),
    require: true
  },
  password: {
    type: db.Sequelize.STRING,
    require: true
  },
  lastLogin: {
    type: db.Sequelize.DATE(),
    default: Date.now(),
    require: true
  }
})

// Users.sync({
//   force: true
// });

module.exports = Users
