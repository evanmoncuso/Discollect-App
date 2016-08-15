const expect = require('chai').expect;
const itemActions = require('../compiledForTests/itemActions.js');
require('es6-promise').polyfill();

const zipUrl = 'zipcodehelper.herokuapp.com';

describe('zipcode helper responses', () => {
  describe('respond to /api/zip', () => {
    it ('should return a response of 200', () => {
      fetch(zipUrl + '/api/zip?lng=-91.4821482&lat=44.95309659999999')
       .then(function(response){
        expect(response.status).to.equal(200);
        done();
      });
    });
    it ('should return with 54729 (a zipcode)', () => {
      fetch(zipUrl + '/api/zip?lng=-91.4821482&lat=44.95309659999999')
       .then(function(response){
        expect(response.body).to.equal(54729);
        done();
      });
    })
  })
  describe('respond to /api/coords', () => {
    it ('should return a response of 200', () => {
      fetch(zipUrl + '/api/coords?zip=19525')
       .then(function(response){
        expect(response.status).to.equal(200);
        done();
      });
    });
    it ('should return response with lat / lng coords', () => {
      fetch(zipUrl + '/api/coords?zip=19525')
       .then(function(response){
        expect(JSON.parse(response.body)).to.equal({lat: 40.3043293, lng: -75.58588859999999});
        done();
      });
    })
  })
});
