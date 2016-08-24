const Listing = require('./listingModel.js');
const User = require('../user/userModel.js');
const db = require('../config/database.js');
const mail = require('./mailingHelper.js');
const fetch = require('isomorphic-fetch');

module.exports = {
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
          zipcode: {
            $or: req.body.zipcodeArray,
            category: {
              $like: req.body.category === 'all-categories' ? '%%' : req.body.category,
            },
            title: {
              $like: req.body.keywords ? `%${req.body.keywords}%` : '%%',
            },
          },
        },
        limit: 50,
        order: [['createdAt', 'DESC']],
      },
    })
    .then((listings) => {
      res.send(listings);
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
      // console.log('error updating', err);
      res.status(400).send(err);
    });
  },

  createNewListing: (req, res) => {
    const zip = req.body.zipcode;
    fetch(`http://zipcodehelper.herokuapp.com/api/state?zip=${zip}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((state) => state.json())
    .then(({ stateUSA }) => {
      const data = req.body;
      data.stateUSA = stateUSA;
      Listing.create(req.body)
      .then(list => {
        res.send(list);
      })
      .catch((err) => {
        if (err) {
          console.error(err);
        }
      });
    });
  },

  getUsersListings: (req, res) => {
    const userId = req.user.id;
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
        mail(req, 'closed');
      });
    });
  },

  removeListing: function (req, res) {
    // console.log(req.query["listingID"]);
    Listing.findOne({
      where: {
        id: req.query.listingID,
      },
    })
    .then(listing =>
      listing.destroy()
    ).then(deleted =>
      res.json(deleted)
    );
  },

  getUserHistory: (req, res) => {
    Listing.findAll({
      where: {
        $and: {
          status: 2,
          $or: {
            takerId: req.query.userid,
            giverId: req.query.userid,
          },
        },
      },
      order: [['createdAt', 'DESC']],
    })
    .then(userHistory => {
      res.send(JSON.stringify(userHistory));
    })
    .catch((err) => {
      res.status(400).send(err);
    });
  },

  listing: function(req, res) {
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
      });
      .then((username) => {
        console.log(listing);
        console.log(username.username)
        const listingData = {
          listing: listing,
          username: username.username,
        };
        res.json(listing);
      })
    })
  },
}
