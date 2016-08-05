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

  login: function(req, res) {
    res.send('Congrats. You are logged in.');
  },

  signup: function(req, res) {
    console.log('boomboom')
    User.findOne({
      where: {username: req.body.username}
    })
    .then(function(user) {
      if (!user) {
        User.create(req.body)
        .then(function() {
          res.status(200);
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