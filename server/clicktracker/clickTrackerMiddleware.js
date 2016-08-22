const clickModel = require('./clickModel');
const Listing = require('../listing/listingModel');
const fetch = require('isomorphic-fetch');

const tracker = (req, res, next) => {
  let item = null;
  if (req.query) {
    item = req.query.id;
  }

  let user = 8;
  if (req.user) {
    user = req.user.dataValues.id;
  }

  if (item) {
    Listing.findOne({
      attributes: ['stateUSA'],
      where: {
        id: item,
      },
    })
    .then((listing) => {
      let state = listing.dataValues.stateUSA;
      clickModel.create({ userId: user, listingId: item, state: state });
    });
  }

  next();
};

module.exports = tracker;
