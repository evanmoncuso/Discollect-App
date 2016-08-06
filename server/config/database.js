var Sequelize = require('sequelize');
var db = new Sequelize('dbdiscollect', 'root', 'cake');

db
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });

  module.exports = db;