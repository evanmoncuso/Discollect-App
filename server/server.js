var express = require('express');
var app = express();
var apiRoutes = require('./config/routes.js')(app, express);

var port = 3000;

require('./config/database.js');
require('./config/middleware.js')(app, express);
app.use('/api', apiRoutes);

app.listen(process.env.PORT || port, console.log('listening to localhost:3000'));
module.exports = app;
