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
};

export default itemActions;
