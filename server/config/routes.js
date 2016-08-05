const userControl = require('../user/userController');
// const listingControl = require('../listing/listingController.js');
const passport = require('passport');


module.exports = function(app, express) {
  const router = express.Router();

  router.get('/user', userControl.getUser);
  router.post('/login', passport.authenticate('local', {failureRedirect: '/'}), userControl.login);
  router.post('/signup', userControl.signup);

  // router.post('/logout', userControl.logout);

  // router.get('/listing', listingControl.getListing);
  // router.get('/getFilteredListings', listingControl.getFilteredListings);
  // router.get('/getAllListings', listingControl.getAllListings);

  return router;
}
