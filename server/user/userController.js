var User = require('./userModel.js');

module.exports = {

  getUser : function(req, res) {
    console.log(req.query);
    User.findOne({where : { username : req.query.name}})
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