import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { browserHistory, Link } from 'react-router';

const defaultImage = './css/ina.jpg';

let ListEntry = ({ entry, action }) => {
  var timeAgo = moment(entry.createdAt).fromNow();
  let pic = entry.picReference || defaultImage;
  return (
      <div className="listView_entry">
        <div onClick={action}>
          <h2>{entry.title}</h2>
          <div className="data_container">
            <div className="entry_img">
              <img src={pic} />
            </div>
            <div className="entry_text">
              <span className="created_ago">{timeAgo}</span>
            </div>
          </div>
        </div>
      </div>
  );
};

export default ListEntry;

// <Link to={`/profile/${entry.giverId}`} >{props.entry.username}</Link>
