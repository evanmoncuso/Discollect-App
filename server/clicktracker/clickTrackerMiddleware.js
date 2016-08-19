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
    clickModel.create({ userId: user, listingId: item });
    // Listing.findOne({
    //   where: {
    //     id: item,
    //   },
    // })
    // .then((resultItem) => {
    //
    //   const url = `http://zipcodehelper.herokuapp.com/api/state?zip=${resultItem.zipcode}`;
    //
    //   fetch(url)
    //   .then((resp) => resp.json())
    //   .then((response) => {
    //     console.log(response);
    //     clickModel.create({ userId: user, listingId: item });
    //   });
    //   clickModel.create({ userId: user, listingId: item });
    //
    // });
  }

  next();
};

module.exports = tracker;
