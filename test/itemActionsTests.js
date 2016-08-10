const expect = require('chai').expect;
const itemActions = require('../compiledForTests/itemActions.js');
require('es6-promise').polyfill();

describe('item Actions', function() {
  it('should be an object', function() {
    expect(typeof itemActions).to.equal('object');
  });
  for (var key in itemActions) {
    it((key + ' should be a function'), function() {
      expect(typeof itemActions[key]).to.equal('function');
    });
  }
});

describe('Item fetch actions', () => {
  describe('Get initial items', () => {
    it ('should return a response of 200', () => {
      fetch('http://localhost:3000/api/getAllListings')
       .then(function(response){
        expect(response.status).to.equal(200);
        done();
      });
    });
    it ('should return a response of an array', () => {
      fetch('http://localhost:3000/api/getAllListings')
       .then(function(response){
        expect(Array.isArray(response.body)).to.equal(true);
        done();
      });
    })
  })
});
