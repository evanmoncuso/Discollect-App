var Sequelize = require('sequelize');
const secrets = require('../../secrets.js');
// const secrets = {};
if (secrets.dbpassword) {
  var dbpassword = secrets.dbpassword;
  var host = secrets.mysql.host;
  var port = secrets.mysql.port;
}

var db = new Sequelize('discollectDB', 'jordan', dbpassword, {
  host: host,
  port: port,
  timezone: '-07:00',
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
