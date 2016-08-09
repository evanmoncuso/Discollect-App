import fetch from 'isomorphic-fetch';

const optimisticCheckUser = ({ zipcode, username, id }) => (
  {
    type: 'LOGIN_VALID',
    zipcode,
    username,
    id,
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
        console.log('createUserLogin: ', res);
        dispatch(optimisticCheckUser(res));
      })
      .catch((err) => {
        if (err) {
          console.log(err);
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
        console.log('checkuserlogin:: ', response);
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
    fetch(url)
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
