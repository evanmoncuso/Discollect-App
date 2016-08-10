import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
// import Listing from './Listing.js'
import { browserHistory } from 'react-router';



let ListEntry = (props) => {
  var timeAgo = moment(props.entry.createdAt).fromNow();
  return (
      <div className="listView_entry" onClick={props.onClick}>
        <h5>{props.entry.title}</h5>
        <p>{props.entry.description}</p>
        <p>{timeAgo}</p>
      </div>
  );
};

  // triggerListing = () => { 
  //   alert('hahaha')
  //   // browserHistory.push('/listing') 
  // };

export default ListEntry;

      // <div className="listView_entry" onClick={ (entry) => browserHistory.push('/listing') }>
