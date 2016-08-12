var Listing = require('./listingModel.js');
// require('es6-promise').polyfill(); // only need if fetch is brought back to be done here
// require('isomorphic-fetch');

module.exports = {
  getAllListings: function (req, res) {
    Listing.findAll({
      where: {
        status: 0,
      },
      limit: 20,
      order: [['createdAt', 'DESC']],
    })
    .then((items) => {
      res.send(items);
    });
  },

  // getFilteredListings must be invoked with category, zipcodeArray and keywords
  getFilteredListings: function(req, res) {
    // console.log("HHHHHIIIIIIIIII !! ~~~~~~~~~~~,", req.body.zipcodeArray);
     // var zipQ = req.body.zipcodeArray.length > 0 ? '$or' : '$like';
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
        // console.log('>>>>>>>>>>', listings);
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
    })
    .catch(function(err) {
      console.log('error updating', err);
      res.status(400).send(err);
    })
  },

  createNewListing: function(req, res) {
    Listing.create(req.body)
    .then(list => {
      console.log(list);
      res.send(list);
    })
  },

  getUsersListings: function(req, res) {
    Listing.findAll({
      where: {
        $or: {
          giverId: req.body.userID,
          takerId: req.body.userID,
        },
      },
    })
    .then((items) => {
      // console.log(items);
      res.send(items);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
  },

  closeListing: function (req, res) {
    // console.log('~~~~~~~~~~~~~~', req.body);
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
      console.log('~~~~~~~~~~~~~~~', data);
      res.send(data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
  },

};


//https://www.zipcodeapi.com/rest/ZuYPOXpKUE8RDdLyX8t3MuU3bDjg70N6uMWjKl4E0dwDqicoqFrdamhl0AC7Bqe6/radius.json/<zip_code>/50/miles.
// API key zipcodeAPI:
// ZuYPOXpKUE8RDdLyX8t3MuU3bDjg70N6uMWjKl4E0dwDqicoqFrdamhl0AC7Bqe6


