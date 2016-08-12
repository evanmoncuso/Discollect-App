var bodyParser = require('body-parser');
var morgan = require('morgan');
var expressSession = require('express-session');
var passport = require('passport');
require('./passport.js')


module.exports = function(app, express) {
  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(expressSession({ secret: 'keyboard cat'}))
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.static(__dirname + '/../../public'));
}