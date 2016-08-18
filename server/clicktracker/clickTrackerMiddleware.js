const clickModel = require('./clickModel.js');

const tracker = (req, res, next) => {
  let item = null;
  if (req.query) {
    item = req.query.id;
  }


  // cannot have a user id of 0, so 8 represents our dummy user
  let user = 8;

  if (req.user) {
    user = req.user.dataValues.id;
  }

  if (item) {
    clickModel.create({ userId: user, listingId: item });
  }

  next();
};

module.exports = tracker;
