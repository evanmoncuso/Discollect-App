var Sequelize = require('sequelize');
var db = require('../config/database.js');
var User = require('../user/userModel.js');

var DiscollectorRating = db.define('discollector_rating', {
  rater_id: { type: Sequelize.INTEGER, defaultValue: null },
  ratee_id: { type: Sequelize.INTEGER, defaultValue: null },
  rating: { type: Sequelize.INTEGER, defaultValue: 0 },
});

DiscollectorRating.belongsTo(User, { foreignKey: 'rater_id', targetKey: 'id' });
DiscollectorRating.belongsTo(User, { foreignKey: 'ratee_id', targetKey: 'id' });

DiscollectorRating.sync({ force: false });

module.exports = DiscollectorRating;
