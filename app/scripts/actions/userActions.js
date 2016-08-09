import fetch from 'isomorphic-fetch';

const optimisticCheckUser = (obj) => (
  {
    type: 'LOGIN_VALID',
    zip: obj.zipcode,
    username: obj.username,
    id: obj.id,
  }
);

const logoutUser = () => (
  {
    type: 'LOGOUT_USER',
  }
);

const userActions = {
  createUser: (username, password, email, zip) => (
    (dispatch) => {
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
        dispatch(optimisticCheckUser(res));
        console.log('the response from fetch', res);
      })
      .catch((err) => {
        if (err) {
          console.log('error', err);
        }
      });
    }
  ),

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
        console.log(response);
        dispatch(optimisticCheckUser(response));
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  ),
  logoutUserServer: () => {
    const url = 'http://localhost:3000/api/logout';
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => res.json())
    .then((response) => {
      console.log('on Logout', response);
    })
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
  },
  logoutUserClient: () => (
    {
      type: 'LOGOUT_USER',
    }
  )
};


module.exports = userActions;
