import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { browserHistory } from 'react-router';
// import { updateListingStatus } from '../actions/itemActions.js';
import itemActions from '../actions/itemActions.js';





const Listing = (props) => {
var listingID = props.params.id;
// console.log('=========>',itemActions)
// console.log('listing index is: ', listingID)
// console.log('listing index is: ', props.currentListing[listingID])
var curr = props.currentListing[listingID]

const backer = () => {
  browserHistory.goBack();
};

  return (
      <div>
        <h4 className='listingTitle'>{curr.title}</h4>
        <h3 className="listingDescription">{curr.description}</h3>
        <h3 className="listingCondition">{curr.condition}</h3>
        <img className="listingImage" src={curr.picReference} />
        <h2 className="listingGiver">{curr.giverId}</h2>
        <button onClick={(e) => {
          e.preventDefault();
          const listingTrigger = {
            listingID: Number(listingID + 1),
            giverId: curr.giverId,
            takerId: props.userId,
          }
          console.log('listing ID: ',listingTrigger.listingID)
          console.log(' giver ID: ',listingTrigger.giverId) 
          console.log(' taker ID: ', listingTrigger.takerId)
          props.dispatchListingStatusChange(listingID)
          // backer(listingID);
          //call method to add to user's
        }}> Call DIBS </button>
        <button onClick={() => backer()}>BACK</button>

      </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentListing: state.items.items,
    userId: state.users.id
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