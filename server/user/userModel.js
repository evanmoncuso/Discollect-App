var Sequelize = require('sequelize');
var db = require('../config/database.js');


var User = db.define('user', {
  username: {type: Sequelize.STRING(20), unique: true},
  password: {type: Sequelize.STRING(20)},
  email: Sequelize.STRING,
  rating: Sequelize.INTEGER,
  picReference: Sequelize.STRING,
  zipcode: Sequelize.INTEGER, 
});

User.sync({force: false})
  .then(() => {
    return User.create({
      username: 'ConMomma',
      password: 'guest',
      email: 'Crad',
      rating: 3,
      picReference: 'http://vk.com/images/gifts/256/70.jpg',
      zipcode: 29135
    });
  });



module.exports = User;