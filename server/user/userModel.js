var Sequelize = require('sequelize');
var db = require('../config/database.js');
var bcrypt = require('bcrypt');
var saltRounds = 10;

var User = db.define('user', {
  username: {type: Sequelize.STRING(20), unique: true},
  password: {type: Sequelize.STRING},
  email: Sequelize.STRING,
  rating: Sequelize.INTEGER,
  picReference: Sequelize.STRING,
  zipcode: Sequelize.INTEGER, 
});


User.beforeCreate(function(user, options, done) {
  var password = user.password;
  bcrypt.genSalt(saltRounds, function(err, salt) {
    if (err) {
      return console.error(err);
    }
    bcrypt.hash(password, salt, function(err, hash) {
      if (err) {
        return console.error(err);
      }
      console.log('hash is ', hash, user.password)
      user.password = hash;
      done(null, user);
    })
  });
})

User.sync({force: true})
  .then(() => {
    return User.create({
      username: 'David1',
      password: 'david1',
      email: 'david@david.com',
      rating: 1,
      picReference: 'http://vk.com/images/gifts/256/71.jpg',
      zipcode: 65008
    });
  });



module.exports = User;