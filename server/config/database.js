var Sequelize = require('sequelize');
const secrets = require('../../secrets.js');

var db = new Sequelize('dbdiscollect', 'root', secrets.dbpassword);

db
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });

  module.exports = db;
