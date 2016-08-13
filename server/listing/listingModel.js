var Sequelize = require('sequelize'); 
var db = require('../config/database.js');
var User = require('../user/userModel.js');

var Listing = db.define('Listing', {
  title: {type: Sequelize.STRING(30)},

  zipcode: Sequelize.INTEGER,
  takerId: { type: Sequelize.INTEGER, defaultValue: null },
  status: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
  picReference: Sequelize.STRING,
  category: Sequelize.STRING,
  description: Sequelize.STRING,
  condition: Sequelize.INTEGER,

});

Listing.belongsTo(User, {foreignKey: 'giverId', targetKey: 'id'});


Listing.sync({ force: false });
// TODO add a foreign key to listing referencing the user that created it



module.exports = Listing;