var userControl = require('../user/userController.js');
var listingControl = require('../listing/listingController.js');



module.exports = function(app, express) {
  var router = express.Router();

  router.get('/user', userControl.getUser);
  router.post('/user', userControl.postUser)
  router.get('/listing', listingControl.getListing);

  return router;
}