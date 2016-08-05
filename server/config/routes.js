var userControl = require('../user/userController.js');
var listingControl = require('../listing/listingController.js');
var passport = require('passport');


module.exports = function(app, express) {
  var router = express.Router();

  router.get('/user', userControl.getUser);
  // router.post('/login', passport.authenticate('local', {failureRedirect: '/'}), userControl.login);
  router.post('/signup', userControl.signup);

  // router.post('/logout', userControl.logout);
  
  // router.get('/listing', listingControl.getListing);
  // router.get('/getAllListings', listingControl.getAllListings);

  return router;
}