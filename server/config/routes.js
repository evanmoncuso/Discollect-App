const userControl = require('../user/userController');
const listingControl = require('../listing/listingController.js');
const passport = require('passport');


module.exports = function(app, express) {
  const router = express.Router();

  router.get('/getUserInfo', userControl.getUserInfo);
  router.post('/login', passport.authenticate('local', {failureRedirect: '/'}), userControl.login);
  router.post('/signup', userControl.signup);
  router.post('/logout', userControl.logout);
  router.put('/update', listingControl.update);

  // router.get('/listing', listingControl.getListing);
  router.put('/getFilteredListings', listingControl.getFilteredListings);
  router.get('/getAllListings', listingControl.getAllListings);
  router.post('/createNewListing', listingControl.createNewListing);
  router.put('/getUsersListings', listingControl.getUsersListings);
  router.put('/closeListing', listingControl.closeListing);
  return router;
};
