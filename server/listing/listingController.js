// `const Sequelize = require('sequelize');
const Listing = require('./listingModel.js');
const User = require('../user/userModel.js');
const db = require('../config/database.js');
const mail = require('./mailingHelper.js');

module.exports = {
  getAllListings: function (req, res) {
    // db.query('SELECT  l.id, l.title, l.zipcode, l.takerId, l.status, l.picReference, l.category, l.description, l.condition, l.createdAt, l.giverId, u.username FROM Listings l, users u WHERE l.giverId = u.id ORDER BY 1 ASC;', { type: Sequelize.QueryTypes.SELECT })
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
  getFilteredListings: function(req, res) {
     Listing.findAll({
          where: {
            $and:{
              status: 0,
              zipcode: {
               $or: req.body.zipcodeArray, //select listing with a zipcode in the zipcodesArray
              },
              category: {
                $like: req.body.category === 'all-categories' ? '%%' : req.body.category,
              },
              title:{
                $like: req.body.keywords ? `%${req.body.keywords}%` : '%%', //select listings with a pattern matching keyword
              }
            }
          },
          limit: 50,
          //store in descending order
          order: [['createdAt', 'DESC']]
        })
      //passes on all the listings that have that category
      .then(function(listings) {
        res.send(listings);
    });
  },

  update: function(req, res) {
    Listing.findOne({
      where: {
        id: req.body.listingID,
      }
    })
    .then(listing => {
      // console.log('listing: ', listing);
      return listing.update({
        status: req.body.statusCode,
        takerId: req.body.takerId, // always 1
      });
    })
    .then(function(listing) {
      res.send(listing)
      mail(req, 'taken');
    })
    .catch(function(err) {
      // console.log('error updating', err);
      res.status(400).send(err);
    })
  },

  createNewListing: function(req, res) {
    Listing.create(req.body)
    .then(list => {
      res.send(list);
    })
  },

  getUsersListings: function(req, res) {
    let userId = req.user.id;
    Listing.findAll({
      where: {
        $or: {
          giverId: userId,
          takerId: userId,
        },
      },
      order: [['createdAt', 'DESC']]
    })
    .then((items) => {
      var data = {
        id: req.user.id,
        items: items,
      };
      res.json(data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
  },

  closeListing: function (req, res) {
    Listing.findOne({
      where: {
        id: req.body.listingID,
      },
    })
    .then((item) => {
      return item.update({
        status: 2,
      });
    })
    .then((data) => {
      Listing.findAll({
        where: {
          $or: {
            giverId: data.dataValues.giverId,
            takerId: data.dataValues.giverId,
          },
        },
        order: [['createdAt', 'DESC']]
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
        id : req.query['listingID']
      }
    })
    .then(listing =>
      listing.destroy()
    ).then(deleted =>
      res.json(deleted)
    );
  },
  getUserHistory: function(req, res) {
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
      order: [['createdAt', 'DESC']]
    })
    .then(userHistory => {
      res.send(JSON.stringify(userHistory));
    })
    .catch((err) => {
      res.status(400).send(err);
    })
  },

  listing: function(req, res) {
    Listing.findOne({
      attributes: ['id', 'title', 'description', 'giverId', 'picReference', 'status', 'condition', 'zipcode'],
      where: {
        id: req.query.id,
      },
    })
    .then(listing=> {
      res.json(listing);
    })
  },
}
//https://www.zipcodeapi.com/rest/ZuYPOXpKUE8RDdLyX8t3MuU3bDjg70N6uMWjKl4E0dwDqicoqFrdamhl0AC7Bqe6/radius.json/<zip_code>/50/miles.
// API key zipcodeAPI:
// ZuYPOXpKUE8RDdLyX8t3MuU3bDjg70N6uMWjKl4E0dwDqicoqFrdamhl0AC7Bqe6
