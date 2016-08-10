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
