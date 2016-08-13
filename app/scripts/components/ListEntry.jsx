import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { browserHistory, Link } from 'react-router';

const defaultImage = './css/ina.jpg';

let ListEntry = (props) => {
  var timeAgo = moment(props.entry.createdAt).fromNow();
  let pic = props.entry.picReference || defaultImage;
  return (
      <div className="listView_entry">
        <div onClick={props.onClick}>
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
        <Link to={`/profile/${props.entry.giverId}`} >{props.entry.username}</Link>

      </div>
  );
};

export default ListEntry;
