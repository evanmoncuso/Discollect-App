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
