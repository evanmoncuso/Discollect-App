import fetch from 'isomorphic-fetch';

import { browserHistory } from 'react-router';

const baseUrl = 'http://localhost:4005';

const optimisticDevValidate = ({ valid, reqLimit, requests }) => (
  {
    type: 'DEV_VALIDATE',
    valid,
    reqLimit,
    requests,
  }
);

module.exports = {
  checkDevStatus: (input) => {
    console.log('3', input)
    return (dispatch) => {
      fetch(`${baseUrl}/key/keyholder?email=${input}`, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then((result) => result.json())
      .then((result) => {
        if(result.valid) {
          dispatch(optimisticDevValidate(result));
          browserHistory.push('/portal');
        } else {
          console.log('invalid dev, please sign up for an account on the page I\'m about to create');
        }
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
    };
  },
};
