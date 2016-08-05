var Sequelize = require('sequelize');
var db = require('../config/database.js');


var User = db.define('User', {
  username: {type: Sequelize.STRING(20), unique: true},
  password: {type: Sequelize.STRING(20)},
  email: Sequelize.STRING,
  rating: Sequelize.INTEGER,
  picReference: Sequelize.STRING,
  zipcode: Sequelize.INTEGER,
});

module.export = User;