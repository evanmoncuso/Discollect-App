import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
// import Listing from './Listing.js'
import { browserHistory } from 'react-router';

const defaultImage = '../../../../public/css/ina.jpg';


let ListEntry = (props) => {
  var timeAgo = moment(props.entry.createdAt).fromNow();
  let pic = props.entry.picReference || defaultImage;
  return (
      <div className="listView_entry" onClick={props.onClick}>
        <h2>{props.entry.title}</h2>
        <div className="data_container">
          <img src={pic} />
          <div className="entry_text">
            <p className="entry_desc">giver: {props.entry.giverId}</p>
            <p className="entry_desc">zipcode: {props.entry.zipcode}</p>
            <p className="created_ago">{timeAgo}</p>
          </div>
        </div>
      </div>
  );
};

  // triggerListing = () => {
  //   alert('hahaha')
  //   // browserHistory.push('/listing')
  // };

export default ListEntry;

      // <div className="listView_entry" onClick={ (entry) => browserHistory.push('/listing') }>
