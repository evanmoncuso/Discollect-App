const express = require('express');
const app = express();
const apiRoutes = require('./config/routes.js')(app, express);
const path = require('path');

const port = 3000;

require('./config/database.js');
require('./config/middleware.js')(app, express);
app.use('/api', apiRoutes);

// for react router browserHistory
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(process.env.PORT || port, console.log('listening to localhost:3000'));
module.exports = app;
