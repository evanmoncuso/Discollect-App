const expect = require('chai').expect;
const chartActions = require('../compiledForTests/chartActions.js');
require('es6-promise').polyfill();

// describe('Chart Actions', function() {
//   it('should be an object', function() {
//     expect(typeof itemActions).to.equal('object');
//   });
//   // for (var key in itemActions) {
//   //   it((key + ' should be a function'), function() {
//   //     expect(typeof itemActions[key]).to.equal('function');
//   //   });
//   // }
// });


describe('Chart fetch chart data', () => {
  describe('Get data for appliances only', () => {
    it ('should return a response of 200', () => {
      fetch('http://discollect-dev-portal.herokuapp.com/api/discollect/category/time?cat=appliances&past=month')
       .then(function(response){
        expect(response.status).to.equal(200);
        done();
      });
    });
    it ('should return an array for a data response', () => {
      fetch('http://discollect-dev-portal.herokuapp.com/api/discollect/category/time?cat=appliances&past=month')
       .then(function(response){
        var d = response.data;
        var l = response.labels;
        expect(d.length).to.equal(l.length);
        done();
      });
    })
  })
});

  