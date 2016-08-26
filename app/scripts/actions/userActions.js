import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router';

// const app = 'http://discollect.net';
const app = 'http://localhost:3000';

const optimisticSignIn = ({ zipcode, avgRating, username, id, picReference, email }) => (
  {
    type: 'LOGIN_VALID',
    zipcode,
    username,
    email,
    id,
    picReference,
    avgRating,
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
    }, error => {
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
      const url = `${app}/api/signup`;
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


  updateTakerRating: (takerId, rating) => (
    (dispatch) => {
      const details = {
        takerId: takerId,
        rating: rating
      };
      const url = app + '/api/updateTakerRating';
      fetch(url, {
        method: 'PUT',
        body: JSON.stringify(details),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .catch((err) => {
        if (err) {
          console.log('error!',err);
        }
      })
    }
  ),

  updateGiverRating: (giverId, rating) => (
    (dispatch) => {
      const details = {
        giverId: giverId,
        rating: rating
      };
      const url = app + '/api/updateGiverRating';
      fetch(url, {
        method: 'PUT',
        body: JSON.stringify(details),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .catch((err) => {
        if (err) {
          console.log('error!',err);
        }
      })
    }
  ),

  checkUserLogin: (username, password) => (
    (dispatch) => {
      const data = JSON.stringify({ username, password });
      const url = `${app}/api/login`;
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
        const locationAllowed = confirm('Enable Location Services?');
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
    const url = `${app}/api/logout`;
    fetch(url, {
      credentials: 'same-origin',
    })
    .then(() => {
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

  getUserInfo: (userId) => (
    (dispatch) => {
      let url;
      if (userId) {
        url = `${app}/api/getUserInfo?id=${userId}`;
      } else {
        url = `${app}/api/getUserInfo`;
      }
      fetch(url, {
        method: 'GET',
        credentials: 'same-origin',
      })
      .then((res) => res.json())
      .then((user) => {
        if (user) {
          dispatch(optimisticSignIn(user));
        }
      });
    }
  ),

  getUserProfile: (userID) => (
    (dispatch) => {
      const url = `${app}/api/userProfile`;
      fetch(url, {
        method: 'PUT',
        body: JSON.stringify({ userID }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(res => res.json())
      .then((res) => {
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
      .then((response) => response.json())
      .then((res) => {
        const url = `${app}/api/updatePic`;
        const updateData = {
          userId: data.giverId,
          picReference: res,
        };
        fetch(url, {
          method: 'PUT',
          credentials: 'same-origin',
          body: JSON.stringify(updateData),
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((dbRes) => dbRes.json())
        .then((user) => {
          dispatch(optimisticSignIn(user));
        });
      });
    }
  ),
};


module.exports = userActions;
