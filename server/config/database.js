var Sequelize = require('sequelize');
const secrets = require('../../secrets.js') || {};
if (secrets.dbpassword) {
  var dbpassword = secrets.dbpassword;
  var host = secrets.host;
  var port = secrets.port;
}

var db = new Sequelize('discollectDB', 'jordan', dbpassword, {
  host: host,
  port: port,
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
