var Listing = require('./listingModel.js');

module.exports = {

  getAllListings: function(req, res){
    Listing.findAll()
  },
}