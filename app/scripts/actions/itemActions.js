import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router';

const baseUrl = 'http://ec2-54-186-167-115.us-west-2.compute.amazonaws.com';

const optimisticSetItems = (items) => (
  {
    type: 'GET_INITIAL_ITEMS',
    items,
  }
);

export const saveUpload = (data_uri, filename, filetype) => (
  {
    type: 'ON_UPLOAD',
    data_uri,
    filename,
    filetype,
  }
);

const itemActions = {
  getLatestListings: () => (
    (dispatch) => {
      const url = baseUrl + '/api/getAllListings';
      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => res.json())
      .then((response) => {
        dispatch(optimisticSetItems(response));
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  ),
  postNewListing: (listingData) => (
    (dispatch) => {
      const photoUrl = 'http://photohelper.herokuapp.com/api/createNewListing';
      const url = baseUrl + '/api/createNewListing';
      if (listingData.picReference === undefined) {
        dispatch(itemActions.postListingAfterPhoto(listingData));
      } else {
        var photoData = {
          title: listingData.title,
          picReference: listingData.picReference,
          filename: listingData.filename,
          filetype: listingData.filetype,
          giverId: listingData.giverId,
        };
        console.log("++++++++++++++++++",listingData);
        console.log('-------------------', photoData);
        fetch(photoUrl, {
          method: 'POST',
          body: JSON.stringify(photoData),
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((res) => res.json())
        .then((response) => {
          console.log(response)
          listingData.picReference = response;
          dispatch(itemActions.postListingAfterPhoto(listingData));
        })
      }
    }
  ),

  postListingAfterPhoto: (data) =>
    (dispatch) => {
    const url = baseUrl + '/api/createNewListing';
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(res => {
      dispatch(itemActions.getLatestListings());
      browserHistory.push('/');
    })
    .catch(err => {
      console.log(err);
    });
  },

  searchItem: (query) => (
    (dispatch) => {
      const url = baseUrl + '/api/getFilteredListings';
      fetch(url, {
        method: 'PUT',
        body: JSON.stringify(query),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => res.json())
      .then((res) => {
        console.log('Search Success: ', res);
        dispatch(optimisticSetItems(res));
        browserHistory.push('/');
      })
      .catch(err => {
        console.log('Search Error: ', err);
      });
    }
  ),

  updateListingStatus: (details) => (
    (dispatch) => {
      console.log('1st step details: ', details);
      var num = JSON.stringify(details);
      const url = baseUrl + '/api/update';
      fetch(url, {
        method: 'PUT',
        body: num,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => res.json())
      .then((res) => {
        console.log('updated listing thingy!: ', res);
        dispatch(itemActions.getLatestListings());
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  ),

  closeListing: (listingID, userID) => (
    (dispatch) => {
      console.log('details >> ', listingID);
      const url = baseUrl + '/api/closeListing';
      fetch(url, {
        method: 'PUT',
        body: JSON.stringify({ listingID }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(res => res.json())
      .then(res => {
        let active = [];
        let pending = [];
        let waiting = [];
        console.log(res);
        for (let item of res) {
          if (item.giverId === userID && item.status === 0) {
            active.push(item);
          } else if (item.giverId === userID && item.status === 1) {
            pending.push(item);
          } else if (item.takerId === userID && item.status === 1) {
            waiting.push(item);
          }
        }
        dispatch({
          type: 'GET_USERS_LISTINGS',
          active: active || [],
          pending: pending || [],
          waiting: waiting || [],
        });
        browserHistory.push('/')
        browserHistory.push('/dashboard')
      })
      .catch(err => {
        console.log(err);
      });
    }
  ),

  getUserHistory: (userId) => (
    (dispatch) => {
      const url = `https://discollectarchive.herokuapp.com/api/getArchives`;
      fetch(url, {
        method: 'PUT',
        credentials: 'same-origin',
        body: JSON.stringify({userId: userId}),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => res.json())
      .then((response) => {
        console.log(response)
        dispatch({
          type: 'GET_USER_HISTORY',
          history: response,
        });
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  ),

  getUsersListings: (userId) => (
    (dispatch) => {
      const url = baseUrl + '/api/getUsersListings';
      fetch(url, {
        credentials: 'same-origin',
      })
      .then((res) => res.json())
      .then((response) => {
        let active = [];
        let pending = [];
        let waiting = [];
        for (let item of response.items) {
          if (item.giverId === response.id && item.status === 0) {
            active.push(item);
          } else if (item.giverId === response.id && item.status === 1) {
            pending.push(item);
          } else if (item.takerId === response.id && item.status === 1) {
            waiting.push(item);
          }
        }
        dispatch({
          type: 'GET_USERS_LISTINGS',
          active: active || [],
          pending: pending || [],
          waiting: waiting || [],
        });
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
    }),

  removeListing: (listingID) => (
    (dispatch) => {
      const url = baseUrl + '/api/removeListing?listingID='+listingID;
      fetch(url, {
        method: 'DELETE',
      })
      .then(res=> {
        browserHistory.push('/')
        browserHistory.push('/dashboard')
      })
    }
  ),

};

export default itemActions;
