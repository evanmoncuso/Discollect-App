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
  },

  //login handles login and, if successful, returns zipcode with res.send for our
  //use in zipcodeArrayBuilder
  login: function(req, res) {
    res.json(req.user.zipcode);
  },

  signup: function(req, res) {
    console.log('hit on api/signup');
    User.findOne({
      where: {username: req.body.username}
    })
    .then(function(user) {
      if (!user) {
        User.create(req.body)
        .then(function(user) {
          res.send(user);
        })
      } else {
        console.error('That username is already in use.');
        res.status(200).send('That username is already in use.')
      }
    })
  },

  logout: function(req, res) {
    res.logout();
    res.redirect('/');
  }
};
