import fetch from 'isomorphic-fetch';

import { browserHistory } from 'react-router';

const optimisticSignIn = ({ zipcode, username, id }) => (
  {
    type: 'LOGIN_VALID',
    zipcode,
    username,
    id,
  }
);

const getCoordsAndZip = (dispatch, bool) => {
  if (navigator.geolocation && bool) {
    navigator.geolocation.getCurrentPosition(position => {
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
        credentials: 'same-origin',
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
      // ENTER CALL FOR ZIP CODES ARRAY HERE
    }, error => {
      // navigator error func
      console.log(error);
    }, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    });
  } else {
    console.log('geolocation not supported or not allowed');
  }
};

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
        credentials: 'same-origin',
        body: data,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => res.json())
      .then((res) => {
        console.log('createUserLogin: ', res);
        browserHistory.push('/');
        dispatch(optimisticSignIn(res));
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
        credentials: 'same-origin',
        body: data,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => res.json())
      .then((response) => {
        dispatch(optimisticSignIn(response));
        // function call coords&Zip
        let locationAllowed = confirm('Enable Location Services?');
        getCoordsAndZip(dispatch, locationAllowed);
        browserHistory.push('/');
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
    fetch(url,{
      credentials: 'same-origin',
    })
    .then((response) => {
      console.log('on Logout', response);
        browserHistory.push('/');
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
  ),

  getUserInfo: () => (
    (dispatch) => {
      const url = 'http://localhost:3000/api/getUserInfo';
      fetch(url, {
        method: 'GET',
        credentials: 'same-origin',
      })
      .then(res=> res.json())
      .then(user =>{
        user = {
          zipcode: user.zipcode,
          id: user.id,
          username: user.username,
          picReference: user.picReference,
        }
        dispatch(optimisticSignIn(user))
      });
    }
  ),

  getUserProfile: (userID) => (
    (dispatch) => {
      const url = 'http://localhost:3000/api/userProfile';
      fetch(url, {
        method: 'PUT',
        body: JSON.stringify({ userID }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(res => res.json())
      .then((res) => {
        console.log(res);
        dispatch({
          type: 'GET_PROFILE_VIEW',
          profile: res,
        });
      })
      .catch(err => {
        console.log(err);
      });
    }
  ),

  uploadProfilePic: (data) => (
    (dispatch) => {
      const urlPhoto = 'http://photohelper.herokuapp.com/api/createNewListing';
      fetch(urlPhoto, {
        method: 'POST', 
        body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
      })
      .then(()=> {
        console.log('All is Well')
      })
    }
  ),
};


module.exports = userActions;
