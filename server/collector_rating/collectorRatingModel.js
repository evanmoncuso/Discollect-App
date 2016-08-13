var Sequelize = require('sequelize');
var db = require('../config/database.js');
var User = require('../user/userModel.js');

var collectorRating = db.define('collector_rating', {
  rater_id: { type: Sequelize.INTEGER, defaultValue: null },
  ratee_id: { type: Sequelize.INTEGER, defaultValue: null },
  listing_id: { type: Sequelize.INTEGER, defaultValue: null },
  rating: { type: Sequelize.INTEGER, defaultValue: 0 },
  review: { type: Sequelize.STRING, defaultValue: null },
});

collectorRating.belongsTo(User, { foreignKey: 'rater_id', targetKey: 'id' });
collectorRating.belongsTo(User, { foreignKey: 'ratee_id', targetKey: 'id' });

collectorRating.sync({ force: false });

module.exports = collectorRating;
