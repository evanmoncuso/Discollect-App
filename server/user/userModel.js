var Sequelize = require('sequelize');
var db = require('../config/database.js');
var bcrypt = require('bcryptjs');
var saltRounds = 10;

var User = db.define('user', {
  username: {type: Sequelize.STRING(20), unique: true},
  password: {type: Sequelize.STRING(100)},
  email: Sequelize.STRING,
  rating: Sequelize.INTEGER,
  picReference: Sequelize.STRING,
  zipcode: Sequelize.INTEGER,
  avgRating: { type: Sequelize.FLOAT, allowNull: false, defaultValue: 0 },  //
  ratingCount: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },  //
});



User.beforeCreate(function(user, options, done) {
  bcrypt.genSalt(saltRounds, function(err, salt) {
    if (err) {
      return console.error('err', err);
    }
    bcrypt.hash(user.password, salt, function(err, hash) {
    console.log('after beforeCreate first line oogabooga');
      if (err) {
        return console.error('err', err);
      }
      console.log('hash is ', hash)
      user.password = hash;
      done(null, user);
    })
  })
})

User.sync({force : false});

module.exports = User;
