var bodyParser = require('body-parser');
var morgan = require('morgan');


module.exports = function(app, express) {
  app.use(bodyParser.json());
  app.use(morgan('dev'));
  app.use(express.static(__dirname + '/../../public'));
}