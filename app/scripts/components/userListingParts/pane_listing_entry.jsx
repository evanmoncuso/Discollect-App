import React from 'react';

const PaneListingEntry = ({ item }) => (
  <div className="pane_listing_entry">
    <h2>title: {item.title}</h2>
    <div className="data_container">
      <div className="entry_img">
        <img src={item.picReference || './css/ina.jpg'} alt="item"/>
      </div>
      <div className="right">
        <div className="entry_text">
          <span className="entry_desc">id: item.id</span>
          <span className="entry_desc">zipcode: item.zipcode</span>
        </div>
        <div className="entry_buttons">
          <button>View Listing</button>
          <button>
            Close Listing
          </button>
        </div>
       </div>
    </div>
  </div>
);

module.exports = PaneListingEntry;
