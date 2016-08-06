import React from 'react';
import { connect } from 'react-redux';

let ListEntry = (props) => {
  return (
      <div className="listView_entry">
        <h5>{props.entry.title}</h5>
        <p>{props.entry.description}</p>
        <p>{props.entry.createdAt}</p>
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
