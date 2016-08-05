var User = require('./userModel.js');

module.exports = {

  getUser : function(req, res) {
    User.findOne({where : { username : req.body.username}})
      .then(user => {
        res.send(user);
      });
  },

  postUser : function(req, res) {
    User.findOrCreate({where : { username : req.body.username}})
      .spread((user, created) => {
        var message = {
          user: user,
          created : created
        };
        res.json(message);
      });
  }
};