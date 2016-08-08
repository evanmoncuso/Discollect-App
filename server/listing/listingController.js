var Listing = require('./listingModel.js');
// require('es6-promise').polyfill(); // only need if fetch is brought back to be done here
// require('isomorphic-fetch');

module.exports = {
  getAllListings: function (req, res) {
    Listing.findAll({
      limit: 20,
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
            category: req.body.category,
          },
          limit: 50,
          //store in descending order
          order: [['createdAt', 'DESC']]
        })
     //passes on all the listings that have that category
      .then(function(listings) {
        var tempArray = [];
        var finalArray = [];
        //cretae zipcode array
        var zipcodes = req.body.zipcodeArray;
        //create keywords array
        var keywords = req.body.keywords.split(',');
        //if zip on listing matches one of zipcodeArray, push
        for (var i = 0; i < listings.length; i++) {
          if (zipcodes.indexOf(listings[i].zip) > -1) {
            tempArray.push(listings[i])
          }
        }
        //if array is empty, return a log
        if (tempArray.length > 0) {
          return console.log('No results found.')
        }

        //tempArray is passed on further filtered
        //keyObject is pulled in for use
        //var keywords is from the search request - turn into array
        
        var keywords = req.body.keywords.split(' ');
        var idArray = [];
        for (var a = 0; a < tempArray.length; a++) {
          //capture each listing here for potential splicing
          var flag = false;
          for (var b = 0; b < keywords.length; b++) {
            // if the keyObject has a key of that keyword AND the value matches the id of the listing
            if (keyObject.hasOwnProperty(keywords[a]) && keyObject[keywords[a]] === tempArray[a].id) {
              //change the flag to true - it's safe to be kept in
              flag = true;
            }
          }
          //if the flag hasn't been changed, cut it out as it doesn't match any keywords
          if (!flag) {
            tempArray.splice(a, 1);
          }
        }
        //if tempArray is now empty => return error message
        if (tempArray.length < 1) {
          return console.log('No results found');
        } else {
          //else return the now completely filtered list of listings
          return tempArray;

      }

    });
  },

  createNewListing: function(req, res) {
    Listing.create(req.body)
    .then(list => {
      console.log(list);
      res.send(list);
    })
  }
};



//https://www.zipcodeapi.com/rest/ZuYPOXpKUE8RDdLyX8t3MuU3bDjg70N6uMWjKl4E0dwDqicoqFrdamhl0AC7Bqe6/radius.json/<zip_code>/50/miles.
// API key zipcodeAPI:
// ZuYPOXpKUE8RDdLyX8t3MuU3bDjg70N6uMWjKl4E0dwDqicoqFrdamhl0AC7Bqe6


