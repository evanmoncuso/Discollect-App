const expect = require('chai').expect;
const userActions = require('../compiledForTests/userActions');
const request = require("request");
require('es6-promise').polyfill();

describe('User Actions', () => {
  it('should be an object', () => {
    expect(typeof userActions).to.equal('object');
  });
  for (var key in userActions) {
    it((key + ' should be a function'), () => {
      expect(typeof userActions[key]).to.equal('function');
    });
  }
  describe('User can log in', () => {
    it ('should return a response of 200', () => {
      const data = JSON.stringify({
        username:'test2',
        password:'password',
      });
      fetch('http://localhost:3000/api/login', {
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json',
        },
      })
       .then(function(response){
        expect(response.status).to.equal(200);
        done();
      });
    });
    it ('should return an object with properties', () => {
      const data = JSON.stringify({
        username:'test2',
        password:'password',
      });
      fetch('http://localhost:3000/api/login', {
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => response.json())
      .then((jsonRes) => {
        expect(jsonRes.body.id).to.equal(8);
        expect(jsonRes.body.username).to.equal('test2');
        expect(jsonRes.body.password).to.equal('password');
        done();
      });
    });
  })
});
