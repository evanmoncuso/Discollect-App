import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router';


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
      const url = 'http://localhost:3000/api/getAllListings';
      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => res.json())
      .then((response) => {
        console.log('~~~~~~~~~~~~~~~~~~~',response);
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
      const url = 'http://localhost:3000/api/createNewListing'
      if (listingData.picReference === undefined) {
        console.log('picRef is undefined')
        dispatch(itemActions.postListingAfterPhoto(listingData));
      } else {
        console.log('picref is good')
        fetch(photoUrl, {
          method: 'POST',
          body: JSON.stringify(listingData),
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((res) => res.json())
        .then((response) => {
          console.log(response)
          listingData.picReference = response;
          console.log(listingData);
          dispatch(itemActions.postListingAfterPhoto(listingData));
        })
      }
    }
  ),

  postListingAfterPhoto: (data) => 
    (dispatch) => {
    console.log('postListingAfterPhoto');
    const url = 'http://localhost:3000/api/createNewListing';
    console.log(data)
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
      const url = 'http://localhost:3000/api/getFilteredListings';
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
      const url = 'http://localhost:3000/api/update';
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
      const url = 'http://localhost:3000/api/closeListing';
      fetch(url, {
        method: 'PUT',
        body: JSON.stringify({ listingID }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(res => res.json())
      .then(res => {
        console.log('///////', userID, '/////', res);
        // itemActions.getUsersListings(res.giverId);
        // browserHistory.push('/');
        // browserHistory.push('/dashboard');
        dispatch({
          type: 'GET_USERS_LISTINGS',
          usersListings: res,
        });
      })
      .catch(err => {
        console.log(err);
      });
    }
  ),

  getUsersListings: (userID) => (
    // get listings associated with user at userID
    (dispatch) => {
      console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
      const url = 'http://localhost:3000/api/getUsersListings';
      fetch(url, {
        method: 'PUT',
        body: JSON.stringify({ userID }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => res.json())
      .then((response) => {
        console.log('GET USERS LISTINGS>>>>>: ', response);
        dispatch({
          type: 'GET_USERS_LISTINGS',
          usersListings: response,
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
      const url = 'http://localhost:3000/api/removeListing?listingID='+listingID;
      fetch(url, {
        method: 'DELETE',
      })
    }
  ),

};

export default itemActions;
