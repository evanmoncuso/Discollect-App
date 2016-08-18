const clickModel = require('./clickModel.js');

const tracker = (req, res, next) => {
  let item = null;
  if (req.query) {
    item = req.query.id;
  }


  // cannot have a user id of 0, so 8 represents our dummy user
  let user = 8;
  let zipcode = null;
  if (req.user) {
    zipcode = req.user.dataValues.zipcode;
    user = req.user.dataValues.id;
  }

  if (item) {
    clickModel.create({userId: user, listingId: item, location: zipcode})
  }

  next();
};

module.exports = tracker;
