import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
// import { updateListingStatus } from '../actions/itemActions.js';
import itemActions from '../actions/itemActions.js';

const defaultImage = '../../../public/css/ina.jpg';

const Listing = ({ currentListing, userId, userName, dispatchListingStatusChange }) => {
  const backer = () => {
    browserHistory.goBack();
  };

  const pic = currentListing.picReference || defaultImage;

  const condish = {
    1: 'New',
    2: 'Excellent',
    3: 'Good',
    4: 'Fair',
    5: 'Salvage',
  };

  let dibsButton = '';
  if (userId && userId !== currentListing.giverId) {
    dibsButton = (<button
      className="listing_view_button"
      onClick={(e) => {
      e.preventDefault();
      const listingTrigger = {
        listingID: Number(currentListing.id),
        giverId: currentListing.giverId,
        takerId: userId,
        statusCode: 1,
      }
      if (userName === undefined || !userName) {
        browserHistory.push('/signup')
      } else {
        dispatchListingStatusChange(listingTrigger);
        browserHistory.push('/');
      }
    }}> Call DIBS </button>);
  }

  return (
    <div className="main_container listing_container">
      <h2> {currentListing.title} </h2>
      <div className="listing_content">
        <div className="image_pane">
          <img src={currentListing.picReference} alt="listing" />
        </div>
        <div className="listing_description">
          {currentListing.description}
        </div>
        <div className="info_pane">
          <div className="info_condition">
            <span className="title">Condition: </span>
            <span className="data">{condish[currentListing.condition]}</span>
          </div>
          <div className="info_giver">
            <span className="title">given by: </span>
            <span className="data">{currentListing.giverId}</span>
          </div>
          <div className="info_zipcode">
            <span className="title">zipcode: </span>
            <span className="data">{currentListing.zipcode}</span>
          </div>
        </div>
      </div>
      <div className="button_container">
        {dibsButton}
        <button
          className="listing_view_button"
          onClick={() => backer()}
        >
          BACK
        </button>
      </div>
    </div>
  );
};

Listing.propTypes = {
  currentListing: React.PropTypes.object,
  userId: React.PropTypes.number,
  userName: React.PropTypes.string,
  dispatchListingStatusChange: React.PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    currentListing: state.items.current,
    userId: state.users.id,
    userName: state.users.username,
  };
};

const mapDispatchToProps = (dispatch) => (
  {
   dispatchListingStatusChange: (listingID) => {
    dispatch(itemActions.updateListingStatus(listingID))
   },
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Listing);
