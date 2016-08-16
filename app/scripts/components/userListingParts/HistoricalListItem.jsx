import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import ratingActions from '../../actions/ratingActions.js';


const HistoricalListItem = ({ item, userId, rating, dispatchCreateRating,  }) => {
  const timeAgo = moment(item.updatedAt).fromNow();
  // rating = rating === null || rating < 1;
  let classes = 'hist_list_item ';
  classes += item.giverId === userId ? 'left_hist' : 'right_hist';

  let flagSide = 'flag ';
  flagSide += item.giverId === userId ? 'right_flag' : 'left_flag';

  return (
    <div className={classes}>
      <div className="data_container">
        <h3>{item.title}</h3>
        <span>{item.giver}</span>
        <span>{item.description}</span>
        <span>{timeAgo}</span>
      </div>
      <div className={flagSide}>{!rating ? (<button
        onClick={() => {
         let rating = prompt("Please give a user rating (1 - 5)");
          console.log('!!!!!!!!!!!!!!!!!!!', userId, item.giverId, item.id, rating, dispatchCreateRating);
          // dispatchCreateRating('Collector', userId, item.takerId, item.id, rating, 'N/A');
          // console.log('updating a rating with any luck: ', item.title)
          // dispatchUpdateRating(item.id, rating);
          //need to capture the rating from ratings table for use here - and when it changes,
          //change the rating on both the database as well as the rating table
          //how to display the rating using the table? Need to attach it to the history list
      }}>
      Rate!</button>) : '' }</div>
    </div>
  );
};

const mapStateToProps = (state) => {
 return {
    userId: state.users.id,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchCloseListing: (listingId) => {
      dispatch(itemActions.closeListing(listingId));
    },
    // dispatchUpdateRating: (item.id, rating) => {
    //   dispatch(ratingActions.updateRating(itemId, rating))
    // }
    dispatchCreateRating: (table, raterID, rateeID, listing_id, rating, review) => {
      dispatch(ratingActions.createRating(table, raterID, rateeID, listing_id, rating, review));
    },
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(HistoricalListItem);


