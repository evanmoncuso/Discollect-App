import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import itemActions from '../actions/itemActions.js';
import Advert from './Advert.jsx';

const defaultImage = './css/ina.jpg';

const Listing = ({ currentListing, zipcode, userId, userName, dispatchListingStatusChange, params, dispatchGetListing }) => {
  if (currentListing.id === undefined) {
    dispatchGetListing(params.id);
  }
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
      className="yellow_button"
      onClick={(e) => {
        e.preventDefault();
        const listingTrigger = {
          listingID: Number(currentListing.id),
          giverId: currentListing.giverId,
          takerId: userId,
          statusCode: 1,
        };
          dispatchListingStatusChange(listingTrigger);
          browserHistory.push('/');
      }
    }
    >
    Call DIBS
    </button>);
  }

  return (
    <div>
      <div className="main_container listing_container">

        <div className="listing_content">

          <div className="image_pane">
            <img src={pic} alt="listing" />
            <div className="button_container">
              {dibsButton}
              <button
                className="yellow_button"
                onClick={() => backer()}
                >
                back
              </button>
            </div>
          </div>

          <div className="listing_description">
            <h2> {currentListing.title} </h2>
            {currentListing.description}
          </div>

          <div className="info_pane">
            <div className="info_condition">
              <span className="title">Condition: </span>
              <span className="data">{condish[currentListing.condition]}</span>
            </div>
            <div className="info_giver">
              <span className="title">given by: </span>
              <span className="data">{currentListing.username}</span>
            </div>
            <div className="info_zipcode">
              <span className="title">zipcode: </span>
              <span className="data">{currentListing.zipcode}</span>
            </div>
          </div>

          <div className="advert_container" className="advertColor">
            <h2 className='makeBig'>Need help collecting?</h2>
            <br />
            <h3 className='makeMedium'>Check out our <br/>partners near you!</h3>
          <br />
          <br />
          <br />
              <Advert zipcode={zipcode} />
          </div>

        </div>
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

const mapStateToProps = (state) => (
  {
    currentListing: state.items.current,
    userId: state.users.id,
    zipcode: state.users.zip,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    dispatchListingStatusChange: (listingID) => {
      dispatch(itemActions.updateListingStatus(listingID));
    },
    dispatchGetListing: (listingID) => {
      dispatch(itemActions.getIndividualListing(listingID));
    },
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Listing);
