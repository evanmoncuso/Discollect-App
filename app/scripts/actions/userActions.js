import fetch from 'isomorphic-fetch';

const optomisticCheckUser = (valid, username) => {
  return {
    type: 'LOGIN_VALID',
    valid,
    username,
  };
};

const userActions = {
  createUser: (username, password, email, zip) => {
    const url = 'http://localhost:3000/api/signup';
    const data = JSON.stringify({
      username,
      password,
      email,
      zipcode: zip,
    });
    fetch(url, {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      console.log('the response from fetch', res);
    })
    .catch((err) => {
      if (err) {
        console.log('error', err);
      }
    });
  },
  checkUserLogin: (username, password) => {
    return (dispatch) => {
      const data = JSON.stringify({ username, password });
      const url = 'http://localhost:3000/api/login';
      fetch(url, {
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        console.log('server response!', res);
        dispatch(optomisticCheckUser(res.valid, res.username));
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
    };
  },
};


module.exports = userActions;
