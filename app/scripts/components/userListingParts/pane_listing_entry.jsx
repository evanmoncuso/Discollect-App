import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import itemActions from '../../actions/itemActions.js';


const PaneListingEntry = ({ item, closeable, removeable, userID, dispatchCloseListing, dispatchRemoveListing }) => {
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
            <Link
              className="pane_listing_button view"
              to={'/listing' + item.id}
            >
              View
            </Link>
            {closeable ? (<button
              className="pane_listing_button close"
              onClick={() => {
                dispatchCloseListing(item.id);
            }}>
              Picked up
            </button>) : ''}
            {removeable ? (<button
              className="pane_listing_button remove"
              onClick={() => {
                dispatchRemoveListing(item.id);
            }}>
              Remove
            </button>) : ''}
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
    dispatchRemoveListing: (listingId) => {
      dispatch(itemActions.removeListing(listingId));
    },
  };
};


module.exports = connect(mapStateToProps, mapDispatchToProps)(PaneListingEntry);
