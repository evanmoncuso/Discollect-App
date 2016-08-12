import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { browserHistory } from 'react-router';
// import { updateListingStatus } from '../actions/itemActions.js';
import itemActions from '../actions/itemActions.js';

const defaultImage = '../../../../public/css/ina.jpg';





const Listing = (props) => {
  var listIDX = props.params.id;
  const curr1 = (listIDX) => {
    for (var i = 0; i < props.currentListing.length; i++) {
      if (props.currentListing[i].id === Number(listIDX)) {
        console.log('found! :', props.currentListing[i])
        return props.currentListing[i];
      }
    }
  }
  var curr = curr1(listIDX);
  var listingID = curr.id;
  const backer = () => {
    browserHistory.goBack();
  };

  let pic = curr.picReference || defaultImage;

const condish = {
  "1": "New",
  "2": "Excellent",
  "3": "Good",
  "4": "Fair",
  "5": "Salvage",
}

  return (
      <div>
        <h4 className='listingTitle'>{curr.title}</h4>
        <h4>Status: {!!curr.status}</h4>
        <h3 className="listingDescription">{curr.description}</h3>
        <h3 className="listingCondition">Condition: {condish[curr.condition]}</h3>
        <img className="listingImage" src={curr.picReference} />
        <h2 className="listingGiver">{curr.giverId}</h2>
        <button onClick={(e) => {
          e.preventDefault();
          const listingTrigger = {
            listingID: Number(listingID),
            giverId: curr.giverId,
            takerId: props.userId,
            statusCode: 1,
          }
          if (props.userName === undefined || !props.userName) {
            browserHistory.push('/signup')
          } else {
            props.dispatchListingStatusChange(listingTrigger);
            browserHistory.push('/');
          // backer(listingID);
          }
        }}> Call DIBS </button>
        <button onClick={() => backer()}>BACK</button>

      </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentListing: state.items.items,
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

// export default Listing;
