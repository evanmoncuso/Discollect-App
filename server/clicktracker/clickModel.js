var Sequelize = require('sequelize');
var db = require('../config/database.js');
var User = require('../user/userModel.js');
var Listing = require('../listing/listingModel.js');

var clickModel = db.define('item_clicks', {
  userId: Sequelize.INTEGER,
  listingId: Sequelize.INTEGER,
});

clickModel.belongsTo(User, {foreignKey: 'userId', targetKey: 'id'});
clickModel.belongsTo(Listing, {foreignKey: 'listingId', targetKey: 'id'});

clickModel.sync({ force: false });

module.exports = clickModel;
