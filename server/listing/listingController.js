var Listing = require('./listingModel.js');

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


  getFilteredListings: function(req, res) {
    // var tempArr is returned array from
    var request = 'https://www.zipcodeapi.com/rest/ZuYPOXpKUE8RDdLyX8t3MuU3bDjg70N6uMWjKl4E0dwDqicoqFrdamhl0AC7Bqe6/radius.json/'
              + user.zipcode + '/50/miles';
      $.ajax({
         url: request,
         type: 'GET'
         data: {
            format: 'json'
         },
         error: function() {
            console.log('An error has occurred');
         },
         dataType: 'jsonp',
         success: function(data) {
            var zipcodeArray = data;
         },
      });

      //async issue? need data before this can run:

        Listing.findAll({ 
          where: {
            //category of listing matches filter category
            listing.category: req.category,
            //listing description contains req.keywords
            listing.
          },
          limit: 20,
          order: [['createdAt', 'DESC']]
        })
      .then(function(listings) {
        var tempArray = [];
        //loop through all listings, check if they're in zipcodeArray
        //if they are, add to tempArray
        for (var i = 0; i < listings.length; i++) {
          if (zipcodeArray.indexOf(listings[i]) > -1) {
            tempArray.push(listings[i])
          }
        }
        //return it from function to front end having been filtered
        return tempArray;
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
