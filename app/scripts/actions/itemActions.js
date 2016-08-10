import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router';


const optimisticSetItems = (items) => (
  {
    type: 'GET_INITIAL_ITEMS',
    items,
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
        console.log(response);
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
      const url = 'http://localhost:3000/api/createNewListing';
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(listingData),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        dispatch(itemActions.getLatestListings());
        console.log(res, dispatch);
        browserHistory.push('/');
      })
      .catch(err => {
        console.log(err);
      });
    }
  ),
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
        console.log('Search Error: ', err)
      })
    }),

  updateListingStatus: (listingID) => (
    (dispatch) => {
    var num = JSON.stringify({listingID: listingID});
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
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  ),

  getUsersListings: (userID) => (
    // get listings associated with user at userID
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
        let listingsData = response.filter((listing) => {
          return listing.giverId === userID;
        });
        dispatch({
          type: 'GET_USERS_LISTINGS',
          userListings: listingsData,
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

module.exports = itemActions;
