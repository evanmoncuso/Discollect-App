import fetch from 'isomorphic-fetch';

const optomisticSetItems = () => {
  return {
    type: 'LOGIN_VALID',
    valid,
    username,
  };
};

const userActions = {
  populateInitialListings: () => {
    const url = 'http://localhost:3000/api/';
    fetch(url, {
      method: 'GET',
      body: data,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => res.json())
    .then((jsonRes) => {
      console.log('the response from fetch', jsonRes);
    })
    .catch((err) => {
      if (err) {
        console.log('error', err);
      }
    });
  },
};
