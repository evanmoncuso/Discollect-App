var expect  = require("chai").expect;
require('es6-promise').polyfill();
require('isomorphic-fetch');
var request = require("request");
var User = require('../server/user/userModel.js'); 

describe("User Database", function() {

  var url = "http://localhost:3000";

  describe("UserModel", function() {
    it("returns a status of 200", function(done) {
      fetch(url)
       .then(function(response){
        expect(response.status).to.equal(200);
        done();
      });
    });
    it("hashes passwords", function(done) {
      this.timeout(4000);
      User.findOne({
        where: {
          username: 'Conradical',
        }
      }).then(user=>{
        console.log('found em')
        return user.destroy();
      })
      .then(()=>{
        return fetch(url + "/api/signup", {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
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
