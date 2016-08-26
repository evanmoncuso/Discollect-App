import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import itemActions from '../../actions/itemActions.js';
import userActions from '../../actions/userActions.js';

const PaneListingEntry = ({ item, closeable, removeable, dispatchUpdateListingGiverRating, dispatchUpdateListingTakerRating, dispatchUpdateTakerRating,dispatchUpdateGiverRating, userID, dispatchCloseListing, dispatchFinalCloseListing, dispatchRemoveListing, dispatchIndivItem }) => {
  let rating;
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
            {closeable ? (
              <form encType="multipart/form-data"
              onSubmit={(e) => {
              e.preventDefault();
              rating = rating.value;
                dispatchUpdateTakerRating(item.takerId, rating);
                dispatchUpdateListingTakerRating(item.id, rating);
                dispatchCloseListing(item.id, userID);
            }}>
            <div className="auth_input rater">Once picked up, please rate <br />the collector?
              <label htmlFor="rating" ></label>
                <select ref={(node) => { rating = node; }} id="rating" required>
                  <option value="5">5 - awesome</option>
                  <option value="4">4 - good</option>
                  <option value="3">3 - okay</option>
                  <option value="2">2 - not great</option>
                  <option value="1">1 - awful</option>
                </select>
              <button type="submit">Submit</button>
              <br />
            </div>
            </form>
            ) : ''}
            {removeable ? (<div className="button_container">
              <button
                className="yellow_button remove"
                onClick={() => {
                  dispatchRemoveListing(item.id);
              }}>
                Remove
              </button>
            </div>) : ''}
            {(item.status === 2 && !closeable) ? (
              <form encType="multipart/form-data"
              onSubmit={(e) => {
              e.preventDefault();
              rating = rating.value;
              dispatchUpdateGiverRating(item.giverId, rating);
              dispatchUpdateListingGiverRating(item.id, rating);
              dispatchFinalCloseListing(item.id, userID);
            }}>
            <div className="auth_input rater">Will you rate <br />your transaction?
              <label htmlFor="rating" ></label>
                <select ref={(node) => { rating = node; }} id="rating" required>
                  <option value="5">5 - awesome</option>
                  <option value="4">4 - good</option>
                  <option value="3">3 - okay</option>
                  <option value="2">2 - not great</option>
                  <option value="1">1 - awful</option>
                </select>
              <button type="submit">Submit</button>
              <br />
            </div>
            </form>
            ) : ''}
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
    dispatchCloseListing: (listingId, userID) => {
      dispatch(itemActions.closeListing(listingId, userID));
    },
    dispatchFinalCloseListing: (listingId, userID) => {
      dispatch(itemActions.finalCloseListing(listingId, userID));
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
