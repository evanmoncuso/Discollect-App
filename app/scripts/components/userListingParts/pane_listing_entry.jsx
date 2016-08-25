import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import itemActions from '../../actions/itemActions.js';
import userActions from '../../actions/userActions.js';



const PaneListingEntry = ({ item, closeable, removeable, dispatchUpdateListingGiverRating, dispatchUpdateListingTakerRating, dispatchUpdateTakerRating, dispatchUpdateGiverRating, userID, dispatchCloseListing, dispatchRemoveListing, dispatchIndivItem }) => {
  closeable = closeable || false;
  removeable = removeable || false;
  return (
    <div className="pane_listing_entry">
      <h2>title: {item.title}</h2>
      <div className="data_container">
        <div className="right">
          <div className="entry_text">
            <span className="entry_desc">id: {item.id}</span>
            <span className="entry_desc">zipcode: {item.zipcode}</span>
          </div>
          <div className="entry_buttons">
            <div className="button_container">
              <button
                className="yellow_button view"
                onClick={() => {
                  dispatchIndivItem(item.id);
                }}>
                View
              </button>
            </div>
            {closeable ? (<div className="button_container">
              <button
                className="yellow_button close"
                onClick={() => {
                  dispatchCloseListing(item.id);
                }}>
                Picked Up
              </button>
            </div>) : ''}
            {removeable ? (<div className="button_container">
              <button
                className="yellow_button remove"
                onClick={() => {
                  dispatchRemoveListing(item.id);
                }}>
                Remove
              </button>
            </div>) : ''}
            {(item.status === 2 && !closeable) ? (<button className='pane_listing_button view'
              onClick={() => {
                console.log('rating transaction!')
                dispatchUpdateGiverRating(item.giverId, rating);
                dispatchUpdateListingGiverRating(item.id, rating);
                dispatchFinalCloseListing(item.id);
              }}>
              Rate your transaction!
            </button>) : ''}
            {(item.status === 1 && !closeable) ? (<p className='pickup'>
              Awaiting your collection!
            </p>) : ''}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userID: state.users.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchCloseListing: (listingId) => {
      dispatch(itemActions.closeListing(listingId));
    },
    dispatchFinalCloseListing: (listingId) => {
      dispatch(itemActions.finalCloseListing(listingId));
    },
    dispatchRemoveListing: (listingId) => {
      dispatch(itemActions.removeListing(listingId));
    },
    dispatchUpdateListingTakerRating: (listingId, rating) => {
      dispatch(itemActions.updateListingTakerRating(listingId, rating));
    },
    dispatchUpdateListingGiverRating: (listingId, rating) => {
      dispatch(itemActions.updateListingGiverRating(listingId, rating));
    },
    dispatchUpdateTakerRating: (takerId, rating) => {
      dispatch(userActions.updateTakerRating(takerId, rating));
    },
    dispatchUpdateGiverRating: (giverId, rating) => {
      dispatch(userActions.updateGiverRating(giverId, rating));
    },
    dispatchIndivItem: (id) => {
      dispatch(itemActions.getIndividualListing(id));
    }

  };
};


module.exports = connect(mapStateToProps, mapDispatchToProps)(PaneListingEntry);
