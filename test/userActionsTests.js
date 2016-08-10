const expect = require('chai').expect;
const userActions = require('../compiledForTests/userActions');
require('es6-promise').polyfill();

describe('User Actions', function() {
  it('should be an object', function() {
    expect(typeof userActions).to.equal('object');
  });
  for (var key in userActions) {
    it((key + ' should be a function'), function() {
      expect(typeof userActions[key]).to.equal('function');
    });
  }
});
