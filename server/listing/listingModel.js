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

Listing.sync({force: false})
  .then(() => {
    return Listing.create({
      title: 'Bedroom Closet',
      giver: 1,
      zipcode: 29135,  
      status: 1,
      picReference: 1,
      category: 'furniture',
      description: 'family fun time zoo party',
      condition: 5,
    });
  });

module.exports = Listing;