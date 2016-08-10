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
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(position => {
            // console.log('>>>>>heard from navigator success>>>>', position)
            let lat = position.coords.latitude;
            let lng = position.coords.longitude;
            dispatch({
              type: 'GET_USER_COORDS',
              lat,
              lng,
            });
            let zipURL = `http://zipcodehelper.herokuapp.com/api/zip?lng=${lng}&lat=${lat}`;
            fetch(zipURL, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            })
            .then((res) => res.json())
            .then(res => {
              dispatch({
                type: 'GET_USER_ZIP',
                zip: res,
              });
            });
          }, error => {
            // navigator error func
            console.log(error);
          }, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
          });
        } else {
          console.log('geolocation not supported');
        }
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
