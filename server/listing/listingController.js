var Listing = require('./listingModel.js');
// require('es6-promise').polyfill(); // only need if fetch is brought back to be done here
// require('isomorphic-fetch');

module.exports = {

  getAllListings: function(req, res){
    Listing.findAll({
      limit: 20,
      order: [['createdAt', 'DESC']],
    })
    .then((items) => {
      res.send(items);
    })
  },
}


  //getFilteredListings must be invoked with category, zipcodeArray and keywords
  getFilteredListings: function(req, res) {
        Listing.findAll({ 
          where: {
            category: req.body.category,
          },
          limit: 50,
          //store in descending order
          order: [['createdAt', 'DESC']]
        })
      .then(function(listings) {
        var tempArray = [];
        var finalArray = [];
        var zipcodes = req.body.zipcodeArray;  
        var keywords = req.body.keywords;      
        for (var i = 0; i < listings.length; i++) {
          if (zipcodes.indexOf(listings[i]) > -1) {
            tempArray.push(listings[i])
          }
        }
        //if array is empty
        if (tempArray.length > 0) {
          return console.log('No results found.')
        }
        //loop through tempArray
        for (var k = 0; k < tempArray.length; k++) {
          //loop through each keyword
          for (var j = 0; j < keywords.length; j++) {
            var flag = false;
            //if none of the keywords match it
            if (tempArray[k].indexOf(keywords[j]) >= 0) {
              flag = true;
            }
          }
            if (!flag) {
              tempArray.splice(k, 1);
            }
        }
        if (tempArray.length < 1) {
          return console.log('No results found');
        } else {
          return tempArray;
        }
          
      })
  }
}







//https://www.zipcodeapi.com/rest/ZuYPOXpKUE8RDdLyX8t3MuU3bDjg70N6uMWjKl4E0dwDqicoqFrdamhl0AC7Bqe6/radius.json/<zip_code>/50/miles.
// API key zipcodeAPI:
// ZuYPOXpKUE8RDdLyX8t3MuU3bDjg70N6uMWjKl4E0dwDqicoqFrdamhl0AC7Bqe6

// pulls a first array using Distance
// iswithinDistance
// filters by category
// filters by keywords in description
// sorts by recency

// {
//   "destination_addresses": [
//     "Woodstock, IL 60098, USA"
//   ],
//   "origin_addresses": [
//     "Redwood City, CA 94063, USA"
//   ],
//   "rows": [
//     {
//       "elements": [
//         {
//           "distance": {
//             "text": "2,140 mi",
//             "value": 3444760
//           },
//           "duration": {
//             "text": "1 day 7 hours",
//             "value": 111250
//           },
//           "status": "OK"
//         }
//       ]
//     }
//   ],
//   "status": "OK"
// }
