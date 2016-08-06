var Sequelize = require('sequelize');
var db = require('../config/database.js');
var User = require('../user/userModel.js');

var Listing = db.define('Listing', {
  title: {type: Sequelize.STRING(20)},
  giver: { type: Sequelize.INTEGER },

  // taker: {
  //   type: Sequelize.INTEGER,
  //   references: 'users',
  //   referencesKey: 'id',
  // },

  zipcode: Sequelize.INTEGER,
  status: Sequelize.BOOLEAN,
  picReference: Sequelize.STRING,
  category: Sequelize.STRING,
  description: Sequelize.STRING,
  condition: Sequelize.INTEGER

});

// TODO add a foreign key to listing referencing the user that created it
// Listing.hasOne(User,{ foreignKey: 'id'})



module.exports = Listing;