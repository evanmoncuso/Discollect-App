var expect  = require("chai").expect;
require('es6-promise').polyfill();
require('isomorphic-fetch');
var request = require("request");
var User = require('../server/user/userModel.js'); 


describe("User Database", function() {

  var url = "http://discollect.net";

  describe("UserModel", function() {
    it("hashes passwords", function(done) {
      this.timeout(2000);
      User.findOne({
        where: {
          username: 'Conradical',
        }
      }).then(user=>{
        console.log('found em')
        if (user) {
          return user.destroy();
        }
        return;
      })
      .then(()=>{
        return fetch(url + "/api/signup", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "username": "Conradical",
            "password": "guest",
            "email": "Crad",
            "rating": 3,
            "picReference": "http://vk.com/images/gifts/256/70.jpg",
            "zipcode": 29135
          }) 
        });
      })
      .then(res => res.json())
      .then((user) => {
        console.log(user);
        expect(user.password).to.not.equal('guest')
        done();
      });
    });
  });

});
