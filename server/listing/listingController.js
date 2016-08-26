const Listing = require('./listingModel.js');
const User = require('../user/userModel.js');
const db = require('../config/database.js');
const mail = require('./mailingHelper.js');
const fetch = require('isomorphic-fetch');

module.exports = {

  updateListingTakerRating: (req, res) => (
    Listing.findOne({
      where: {
        id: req.body.listingId,
      },
    })
    .then(listing => {
    console.log('back end - update listing taker rating');
      listing.update({
        takerRating: req.body.rating,
      })
    })
    .catch((err) => {
      res.status(400).send(err);
    })
  ),

  updateListingGiverRating: (req, res) => (
    Listing.findOne({
      where: {
        id: req.body.listingId,
      },
    })
    .then(listing => {
    console.log('back end - update listing Giver rating', listing.id)
      listing.update({
        giverRating: req.body.rating,
      })
    })
    .catch((err) => {
      console.log('not finding listing,', req.body.listingId)
      res.status(400).send(err);
    })
  ),

  getAllListings: function (req, res) {
    Listing.findAll({
      attributes: ['id', 'title', 'picReference', 'createdAt', 'zipcode', 'category', 'coordinates'],
      where: {
        status: 0,
      },
      limit: 30,
      order: [['createdAt', 'DESC']],
    })
    .then((items) => {
      res.send(items);
    });
  },

  // getFilteredListings must be invoked with category, zipcodeArray and keywords
  getFilteredListings: (req, res) => {
    Listing.findAll({
      where: {
        $and: {
          status: 0,
          category: {
            $like: req.body.category === 'all-categories' ? '%%' : req.body.category,
          },
          condition: {
            $in: req.body.condition,
          },
          zipcode: {
            $like: req.body.zipcode ? `%${req.body.zipcode}%` : '%%',
          },
          title: {
            $like: req.body.title ? `%${req.body.title}%` : '%%',
          },
        },
      },
      limit: 100,
      order: [['createdAt', 'DESC']],
    })
    .then((listings) => {
      res.send(listings);
    });
  },

  getOldListings: (req, res) => {
    let userId = req.body.userId;
    Listing.findAll({
      where: {
          $or: [
            {takerId: userId},
            {giverId: userId}
          ],
          $and: {
            $or: {
              status: [2,3]
            },
          },
      },
      limit: 50,
      order: [['createdAt', 'DESC']],
    })
    .then((items) => {
      res.send(items);
    });
  },

  update: (req, res) => {
    Listing.findOne({
      where: {
        id: req.body.listingID,
      },
    })
    .then(listing => (
      listing.update({
        status: req.body.statusCode,
        takerId: req.body.takerId,
      })
    ))
    .then((listing) => {
      res.send(listing);
      mail(req, 'taken');
    })
    .catch((err) => {
      res.status(400).send(err);
    });
  },

  createNewListing: (req, res) => {
    let coords = req.body.coordinates.split(',');
    let lat = coords[0];
    let lng = coords[1];
    let url = `http://zipcodehelper.herokuapp.com/api/zip_state?lat=${lat}&lng=${lng}`;
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((geoResp) => geoResp.json())
    .then(({ zip, state }) => {
      const data = req.body;
      data.stateUSA = state;
      data.zipcode = zip;
      Listing.create(req.body)
      .then(list => {
        res.send(list);
      })
      .catch((err) => {
        if (err) {
          console.error(err);
          res.send(400);
        }
      });
    });
  },

  getUsersListings: (req, res) => {
    const userId = req.user.id || req.query.id;
    Listing.findAll({
      where: {
        $or: {
          giverId: userId,
          takerId: userId,
        },
      },
      order: [['createdAt', 'DESC']],
    })
    .then((items) => {
      const data = {
        id: req.user.id,
        items,
      };
      res.json(data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
  },

  closeListing: (req, res) => {
    Listing.findOne({
      where: {
        id: req.body.listingID,
      },
    })
    .then((item) => (
      item.update({
        status: 2,
      })
    ))
    .then((data) => {
      Listing.findAll({
        where: {
          $or: {
            giverId: data.dataValues.giverId,
            takerId: data.dataValues.giverId,
          },
        },
        order: [['createdAt', 'DESC']],
      })
      .then((items) => {
        res.send(items);
        // mail(req, 'closed');
      });
    });
  },

  finalCloseListing: (req, res) => {
    Listing.findOne({
      where: {
        id: req.body.listingID,
      },
    })
    .then((item) => (
      item.update({
        status: 3,
      })
    ))
    .then((data) => {
      Listing.findAll({
        where: {
          $or: {
            giverId: data.dataValues.giverId,
            takerId: data.dataValues.giverId,
          },
        },
        order: [['createdAt', 'DESC']],
      })
      .then((items) => {
        res.send(items);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
    });
  },

  removeListing: function (req, res) {
    Listing.findOne({
      where: {
        id: req.query.listingID,
      },
    })
    .then(listing =>{
     listing.update({
        status: 4,
      })
    }
    ).then(deleted => {
      res.json(deleted)
    }
    );
  },

  // getUserHistory: (req, res) => {
  //   Listing.findAll({
  //     where: {
  //       $and: {
  //         status: 2,
  //         $or: {
  //           takerId: req.query.userid,
  //           giverId: req.query.userid,
  //         },
  //       },
  //     },
  //     order: [['createdAt', 'DESC']],
  //   })
  //   .then(userHistory => {
  //     res.send(JSON.stringify(userHistory));
  //   })
  //   .catch((err) => {
  //     res.status(400).send(err);
  //   });
  // },

  listing: (req, res) => {
    Listing.findOne({
      attributes: ['id', 'title', 'description', 'giverId', 'picReference', 'status', 'condition', 'zipcode'],
      where: {
        id: req.query.id,
      },
    })
    .then((listing) => {
      User.findOne({
        attributes: ['username'],
        where: {
          id: listing.giverId,
        },
      })
      .then((username) => {
        const listingData = {
          id: listing.id,
          title: listing.title,
          description: listing.description,
          giverId: listing.giverId,
          picReference: listing.picReference,
          status: listing.status,
          condition: listing.condition,
          zipcode: listing.zipcode,
          username: username.username,
          avgRating: username.avgRating,
        };
        res.json(listingData);
      });
    });
  },
};
