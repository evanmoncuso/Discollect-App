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
          <div className="entry_img">
            <img src={pic} />
          </div>
          <div className="entry_text">
            <span className="entry_desc">giver: {props.entry.giverId}</span>
            <span className="entry_desc">zipcode: {props.entry.zipcode}</span>
            <span className="created_ago">{timeAgo}</span>
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
