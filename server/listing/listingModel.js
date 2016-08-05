var Sequelize = require('sequelize');
var db = require('../config/database.js');
var User = require('../user/userModel.js');

var Listing = db.define('Listing', {
  title: {type: Sequelize.STRING(20)},
  // giver: {
  //   type: Sequelize.INTEGER,
  //   references: {
  //     model: User,
  //     key: id,
  //   }
  // },

  // taker: {
  //   type: Sequelize.INTEGER,
  //   references: {
  //     model: User,
  //     key: id,
  //   }
  // },

  zipcode: Sequelize.INTEGER,
  status: Sequelize.BOOLEAN,
  picReference: Sequelize.STRING,
  category: Sequelize.STRING,
  description: Sequelize.STRING,
  createdAt: Sequelize.DATEONLY,
  condition: Sequelize.INTEGER

})