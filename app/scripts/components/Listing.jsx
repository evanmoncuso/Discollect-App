import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { browserHistory } from 'react-router';
// import { updateListingStatus } from '../actions/itemActions.js';
import itemActions from '../actions/itemActions.js';





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


  return (
      <div>
        <h4 className='listingTitle'>{curr.title}</h4>
        <h4>Status: {!!curr.status}</h4>
        <h3 className="listingDescription">{curr.description}</h3>
        <h3 className="listingCondition">{curr.condition}</h3>
        <img className="listingImage" src={curr.picReference} />
        <h2 className="listingGiver">{curr.giverId}</h2>
        <button onClick={(e) => {
          e.preventDefault();
          const listingTrigger = {
            listingID: Number(listingID),
            giverId: curr.giverId,
            takerId: props.userId,
          }
          console.log('listing ID: ',listingTrigger.listingID)
          console.log(' giver ID: ',listingTrigger.giverId) 
          console.log(' taker ID: ', listingTrigger.takerId)
          if (props.userName === undefined || !props.userName) {
            console.log('not signed in')
            browserHistory.push('/signup')            
          } else {
            console.log('signed in!')
            props.dispatchListingStatusChange(listingID);
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