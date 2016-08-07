import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

let ListEntry = (props) => {
  var timeAgo = moment(props.entry.createdAt).fromNow();
  return (
      <div className="listView_entry">
        <h5>{props.entry.title}</h5>
        <p>{props.entry.description}</p>
        <p>{timeAgo}</p>
      </div>
  );
};


export default ListEntry;

     // SCHEMA FIELDS
     // title: 'Bedroom Closet',
     //  giver: 1,
     //  zipcode: 29135,
     //  status: 1,
     //  picReference: 1,
     //  category: 'furniture',
     //  description: 'family fun time zoo party',
     //  condition: 5,
