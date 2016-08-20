import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router';

const baseUrl = 'http://discollect-dev-portal.herokuapp.com';

const optimisticDevValidate = ({ valid, reqLimit, requests }) => (
  {
    type: 'DEV_VALIDATE',
    valid,
    reqLimit,
    requests,
  }
);

const optimisticDevCreate = ({ reqLimit, key }) => (
  {
    type: 'DEV_CREATE',
    valid: true,
    reqLimit,
    requests: 0,
    key,
  }
);

const devActions = {
  checkDevStatus: (input) => (
    (dispatch) => {
      fetch(`${baseUrl}/key/keyholder?email=${input}`, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((result) => result.json())
      .then((result) => {
        if (result.valid) {
          dispatch(optimisticDevValidate(result));
          browserHistory.push('/portal');
        } else {
          browserHistory.push('/dev-signup');
        }
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  ),

  createDevKey: (email) => (
    (dispatch) => {
      const data = JSON.stringify({
        email,
      });
      fetch(`${baseUrl}/key`, {
        method: 'POST',
        credentials: 'same-origin',
        body: data,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => res.json())
      .then((res) => {
        dispatch(optimisticDevCreate(res));
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  ),
};

module.exports = devActions;
