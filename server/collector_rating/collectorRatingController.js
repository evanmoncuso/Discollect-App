var CollectorRatingModel = require('./collectorRatingModel.js');

module.exports = {
  createCollectorRating: function (req, res) {
    CollectorRatingModel.create(req.body)
    .then(rating => {
      console.log(rating);
      res.send(rating);
    });
  },
  getAllUserRatings: function (req, res) {
    CollectorRatingModel.findAll({
      where: {
        ratee_id: req.body.rateeID,
      },
    })
    .then(function(ratings) {
      console.log(ratings);
    });
  },
};
