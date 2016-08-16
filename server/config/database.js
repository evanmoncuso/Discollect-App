var Sequelize = require('sequelize');
// const secrets = require('../../secrets.js');


var db = new Sequelize('discollectDB', 'jordan', 'abcd1234', {
  host: 'rds-mysql-discollectdb.c0eor5cjwn0u.us-west-1.rds.amazonaws.com',
  port: 3306,
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
