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
                $like: req.body.category === "all-categories" ? '%%' : req.body.category,
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
      //   var tempArray = [];
      //   var finalArray = [];
      //   //cretae zipcode array
      //   var zipcodes = req.body.zipcodeArray;
      //   //create keywords array
      //   var keywords = req.body.keywords.split(',');
      //   //if zip on listing matches one of zipcodeArray, push
      //   for (var i = 0; i < listings.length; i++) {
      //     if (zipcodes.indexOf(listings[i].zip) > -1) {
      //       tempArray.push(listings[i])
      //     }
      //   }
      //   //if array is empty, return a log
      //   if (tempArray.length > 0) {
      //     return console.log('No results found.')
      //   }

      //   //tempArray is passed on further filtered
      //   //keyObject is pulled in for use
      //   //var keywords is from the search request - turn into array

      //   var keywords = req.body.keywords.split(' ');
      //   var idArray = [];
      //   for (var a = 0; a < tempArray.length; a++) {
      //     //capture each listing here for potential splicing
      //     var flag = false;
      //     for (var b = 0; b < keywords.length; b++) {
      //       // if the keyObject has a key of that keyword AND the value matches the id of the listing
      //       if (keyObject.hasOwnProperty(keywords[a]) && keyObject[keywords[a]] === tempArray[a].id) {
      //         //change the flag to true - it's safe to be kept in
      //         flag = true;
      //       }
      //     }
      //     //if the flag hasn't been changed, cut it out as it doesn't match any keywords
      //     if (!flag) {
      //       tempArray.splice(a, 1);
      //     }
      //   }
      //   //if tempArray is now empty => return error message
      //   if (tempArray.length < 1) {
      //     return console.log('No results found');
      //   } else {
      //     //else return the now completely filtered list of listings
      //     return tempArray;

      // }

    });
  },

  update: function(req, res) {

    Listing.findOne({
      where: {
        id: req.body.listingID
      }
    })
    .then(listing => {
      // console.log('listing: ', listing);
      return listing.update({
        status: 1,
        takerId: req.body.takerId,
      });
    })
    .then (function(listing) {
      res.send(listing)
    })
    .catch(function(err) {
      console.log('error updating', err);
      res.status(400).send(err)
    })
  },

  createNewListing: function(req, res) {
    Listing.create(req.body)
    .then(list => {
      console.log(list);
      res.send(list);

    })
  },

};



//https://www.zipcodeapi.com/rest/ZuYPOXpKUE8RDdLyX8t3MuU3bDjg70N6uMWjKl4E0dwDqicoqFrdamhl0AC7Bqe6/radius.json/<zip_code>/50/miles.
// API key zipcodeAPI:
// ZuYPOXpKUE8RDdLyX8t3MuU3bDjg70N6uMWjKl4E0dwDqicoqFrdamhl0AC7Bqe6


