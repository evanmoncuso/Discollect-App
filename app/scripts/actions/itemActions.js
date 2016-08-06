import fetch from 'isomorphic-fetch';

const optimisticSetItems = (items) => {
  return {
    type: 'GET_INITIAL_ITEMS',
    items: items,
  };
};

const itemActions = {
  populateInitialListings: () => {
    return (dispatch) => {
      const url = 'http://localhost:3000/api/getAllListings';
      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => res.json())
      .then((response) => {
        console.log(response)
        dispatch(optimisticSetItems(response));
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
    };
  },
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
        console.log(res, dispatch);
      })
      .catch(err => {
        console.log(err);
      });
    }
  ),
};

export default itemActions;
