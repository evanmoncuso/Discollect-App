const fetch = require('isomorphic-fetch');
const Listing = require('./listingModel.js');
const User = require('../user/userModel.js');

const mail = (endpoint, data) => {
  let url = `https://discollect-mailservice.herokuapp.com/api/${endpoint}`
  fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    body: data,
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .catch((err) => {
    if(err) {
      console.log(err);
    }
  })
};

const getInfoForMessages = (req, endpoint) => {
  console.log(req.body);
  Listing.findOne({
    where: {
      id: req.body.listingID,
    }
  })
  .then((listing) => {
    User.findOne({
      where: {
        id: listing.giverId,
      }
    })
    .then((giver) => {
      User.findOne({
        where: {
          id: listing.takerId,
        }
      })
      .then((taker) => {
        let data = {
          giverUsername: giver.username,
          giverEmail: giver.email,
          takerUsername: taker.username,
          takerEmail: taker.email,
          itemname: listing.title,
        };

        data = JSON.stringify(data);

        mail(endpoint, data);
      })
    })
  })
}

module.exports = getInfoForMessages;
