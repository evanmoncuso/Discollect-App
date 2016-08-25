var User = require('./userModel.js');

module.exports = {

  updateTakerRating: function(req, res) {
    console.log(req.body.takerId)
    User.findOne({
      where: {
        id: req.body.takerId,
      },
    })
    .then((user) => {
      console.log('doing the rating workings for the taker/user: ',user.username)
      const oldTotal = user.avgRating * user.ratingCount;
      console.log('1',user.avgRating, user.ratingCount, oldTotal);
      const newTotal = oldTotal + req.body.rating;
      console.log('2',newTotal);
      const newCounter = user.ratingCount + 1;
      const newAverage = (newTotal / newCounter).toFixed(1); 
      console.log('3',newAverage)
      user.update({
        avgRating: newAverage,
        ratingCount: newCounter,
      })
    })
    .catch((err) => {
      console.log('updateTakerRating issue')
      res.status(400).send(err);
    });    
  }, 

  getUserInfo : function(req, res) {
    if (req.user){
      User.findOne({where : { id : req.user.id}})
        .then(user => {
          res.json(user);
        });
      } else{
        res.json({user: null});
      }
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
    var message = {
      id: req.user.id,
      username: req.user.username,
      email: req.user.email,
      zipcode: req.user.zipcode,
      picReference: req.user.picReference,
    };
    res.json(message);
  },

  signup: function(req, res) {
    // console.log('hit on api/signup');
    User.findOne({
      where: {username: req.body.username}
    })
    .then(function(user) {
      if (!user) {
        User.create(req.body)
        .then(function(user) {
          var message = {
            id: user.id,
            username: user.username,
            zipcode: user.zipcode
          };
          res.json(message);
        })
      } else {
        console.error('That username is already in use.');
        res.status(200).send('That username is already in use.')
      }
    })
  },

  logout: function(req, res) {
    req.logout();
    req.session.destroy(function(err) {
      // console.log('in teh part to destroy sesh')
      res.send();
    })
  },

  userProfile: function(req, res) {
    User.findOne({
      where: {
        id: req.body.userID,
      },
    })
    .then(function(user){
      // console.log('^^^^^',user);
      res.send(user);
    })
    .catch(function(err){
      console.log(err);
    });
  },

  updatePic: function(req, res) {
    // console.log(req.body);
    User.findOne({
      where: {
        id: req.body.userId,
      },
    })
    .then(user => {
      // console.log(user);
      return user.update({
        picReference: req.body.picReference,
      });
    })
    .then((user)=>{
      user.password = null;
      res.send(user);
    });
  }

};
