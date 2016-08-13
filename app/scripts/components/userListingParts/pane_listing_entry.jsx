import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import itemActions from '../../actions/itemActions.js';


const PaneListingEntry = ({ item, dispatchCloseListing, closeable, removeable }) => {
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
            <button onClick={() => {
                browserHistory.push('/listing/' + item.id)
            }}>
              View
            </button>
            {closeable ? (<button onClick={() => {
                dispatchCloseListing(item.id)
            }}>
              Close
            </button>) : ''}
            {removeable ? (<button onClick={() => {
              console.log('you did it!');
            }}>
              Remove
            </button>) : ''}
          </div>
         </div>
      </div>
    </div>
  )
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


module.exports = connect(null, mapDispatchToProps)(PaneListingEntry);
