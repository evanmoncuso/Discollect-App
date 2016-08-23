const express = require('express');
const app = express();
const apiRoutes = require('./config/routes.js')(app, express);
const path = require('path');
const cors = require('cors');

const port = 3000;

app.use(cors());

require('./config/database.js');
require('./config/middleware.js')(app, express);
const clickTracker = require('./clicktracker/clickTrackerMiddleware.js');

app.use(express.static(path.join(__dirname, '../public/index.html')));

app.use('/api/listing', clickTracker);
app.use('/api', apiRoutes);
//
// // for react router browserHistory
app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/index.html'));
  // res.redirect('/');
});


app.listen(process.env.PORT || port, console.log('listening to localhost:3000'));
module.exports = app;
