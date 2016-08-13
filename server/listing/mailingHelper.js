const fetch = require('isometric-fetch');

const sendEmail = (endpoint, data) => {
  let url = `https://discollect-mailservice.herokuapp.com/api/${endpoint}`
  fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    body: data,
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(() => {
    console.log('yay');
  })
  .catch((err) => {
    if(err) {
      console.log(err);
    }
  })
};

module.exports = sendEmail;
