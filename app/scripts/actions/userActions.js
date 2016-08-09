import fetch from 'isomorphic-fetch';

const optimisticCheckUser = (zip) => (
  {
    type: 'LOGIN_VALID',
    zip, //
  }
);

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
    .then((res) => res.json())
    .then((res) => {
      console.log('the response from fetch', res);
    })
    .catch((err) => {
      if (err) {
        console.log('error', err);
      }
    });
  },
  checkUserLogin: (username, password) => (
    (dispatch) => {
      const data = JSON.stringify({ username, password });
      const url = 'http://localhost:3000/api/login';
      fetch(url, {
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => res.json())
      .then((response) => {
        console.log('checkuserlogin:: ', response);
        // dispatch(optimisticCheckUser(response));
        dispatch({
          type: 'SAVE_USER_ID',
          userID: response.id,
        });
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  ),
};


module.exports = userActions;
