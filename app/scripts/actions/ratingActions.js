import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router';

// createUserCollectorRating
const ratingActions = {
  createCollectorRating: (table, rater_id, ratee_id, rating, review) => (
    // createCollectorRating
    (dispatch) => {
      const url = `http://localhost:3000/api/create${table}Rating`;
      fetch(url, {
        method: 'POST',
        body: { rater_id, ratee_id, rating, review },
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
  getAllUserCiscollectorRatings: (userID) => (
    (dispatch) => {
      const url = 'http://localhost:3000/api/createCollectorRating';
      fetch(url, {
        method: 'POST',
        body: { rater_id, ratee_id, rating, review },
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
