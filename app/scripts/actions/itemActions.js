import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router';

const secrets = require('../../../secrets.js');
const app = secrets.appHost || 'http://localhost:3000';


console.log(app)

const searchUrl = 'http://localhost:8080/listings';
const zipUrl = 'http://zipcodehelper.herokuapp.com/api/state?zip=';

const optimisticSetItems = (items) => (
  {
    type: 'GET_INITIAL_ITEMS',
    items,
  }
);

const optimisticIndivItem = (item) => (
  {
    type: 'SET_CURR_ITEM',
    current: item,
  }
);


const itemActions = {
  getLatestListings: () => (
    (dispatch) => {
      const url = app + '/api/getAllListings';
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

  getIndividualListing: (id) => (
    (dispatch) => {
      const url = app + '/api/listing?id=' + id;
      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => res.json())
      .then((response) => {
        dispatch(optimisticIndivItem(response));
        // then reroute to the listing page that this item needs
        return response.id;
      })
      .then((id) => {
        browserHistory.push('/listing'+id);
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
      const url = app + '/api/createNewListing';
      if (!listingData.picReference) {
        dispatch(itemActions.postListingAfterPhoto(listingData));
      } else {
        const photoData = {
          title: listingData.title,
          picReference: listingData.picReference,
          filename: listingData.filename,
          filetype: listingData.filetype,
          giverId: listingData.giverId,
        };
        fetch(photoUrl, {
          method: 'POST',
          body: JSON.stringify(photoData),
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((res) => res.json())
        .then((response) => {
          listingData.picReference = response;
          dispatch(itemActions.postListingAfterPhoto(listingData));
        })
      }
    }
  ),

  postListingAfterPhoto: (data) => (
    (dispatch) => {
      console.log(data);
      const url = app + '/api/createNewListing';
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
    }
  ),

  searchItem: (query) => (
    (dispatch) => {
      dispatch({
        type: 'UPDATE_SEARCH_PARAMS',
        keywords: query.keywords || null,
        category: query.category || null,
        zip: query.zip || null,
      })
    }
  ),

  elasticSearch: (query) => (
    (dispatch) => {
      const url = searchUrl + '?keywords=' + query.keywords + '&category=' + query.category + '&coordinates=' + query.coordinates + '&distance=' + query.distance + 'km';
        // TODO TEMPLATE STRING
      fetch(url)
      .then((res) => res.json())
      .then((res) => {
        console.log('from the search', res.hits.hits)
        var data = res.hits.hits.map(val=>{
          val._source.picReference = val._source.picreference;
          val._source.createdAt = val._source.createdat;
          return val._source;
        })
        // TODO NEW SETSTATE

        dispatch(optimisticSetItems(data));
        browserHistory.push('/');
      })
      .catch(err => {
        console.log('Search Error: ', err);
      });
    }
  ),

  updateListingStatus: (details) => (
    (dispatch) => {
      const num = JSON.stringify(details);
      const url = app + '/api/update';
      fetch(url, {
        method: 'PUT',
        body: num,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => res.json())
      .then((res) => {
        dispatch(itemActions.getLatestListings());
        fetch(searchUrl + '/' + details.listingID, {
          method: 'DELETE',
        }).then(()=>{
          console.log('deleted from elasticSearch')
        })
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
      const url = app + '/api/closeListing';
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

  getUsersListings: () => (
    (dispatch) => {
      const url = app + '/api/getUsersListings';
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
      const url = app + '/api/removeListing?listingID='+listingID;
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
