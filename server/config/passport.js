var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var User = require('../user/userModel');
var bcrypt = require('bcryptjs');

passport.use(new localStrategy(function(username, password, cb) {
  User.findOne({ where: {username:username} })
  .then(function(user) {
    if (!user) {
      return cb(null, false);
    }
    bcrypt.compare(password, user.password, function(err, res) {
    if (err) {
      return console.log('Password sucks chunks', err)
    }
    if (res) {
      return cb(null, user);
    }  
      return cb(null, false);
    })
  })
}));

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  User.findOne({where: {id: id} })
  .then(function(user) {
    cb(null, user);
  })
  .catch(function(err) {
    console.log("Error, doosh.")
  })
})