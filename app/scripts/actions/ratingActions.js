import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router';

// createUserCollectorRating
const ratingActions = {
  createRating: (table, rater_id, ratee_id, listing_id, rating, review) => (
    // createCollectorRating
    // createDiscollectorRating
    (dispatch) => {
      console.log("!?", rater_id, ratee_id, rating, review);
      const url = `http://localhost:3000/api/create${table}Rating`;
      fetch(url, {
        method: 'POST',
        body: JSON.stringify({ rater_id, ratee_id, listing_id, rating, review }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        console.log('rating creator: ', res);
        browserHistory.push('/');
        browserHistory.push('/dashboard');
      });
    }
  ),


  getAllUserRatings: (userID) => (
    (dispatch) => {
      const url = 'http://localhost:3000/api/createCollectorRating';
      fetch(url, {
        method: 'POST',
        body: JSON.stringify({ userID }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        console.log('rating creator: ', res);
        dispatch({
          type: 'nada',
        });
      });
    }
  ),

};

export default ratingActions;
