var Sequelize = require('sequelize');
const secrets = require('../../secrets.js') || {};


var db = new Sequelize('discollectDB', 'jordan', secrets.dbpassword, {
  host: secrets.host,
  port: secrets.port,
  // dialect: 'mysql',
  // pool: {
  //   max: 5,
  //   min: 0,
  //   idle: 10000,
  // },
});

db
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });

  module.exports = db;
