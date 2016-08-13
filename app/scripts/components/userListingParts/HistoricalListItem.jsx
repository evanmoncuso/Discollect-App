import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';

const HistoricalListItem = ({ item }) => {
  var timeAgo = moment(item.updatedAt).fromNow();
  return (
    <div className="hist_list_item">
      <div className="data_container">
        <h3>{item.title}</h3>
        <span>{item.giver}</span>
        <span>{item.description}</span>
        <span>{timeAgo}</span>
      </div>
      <Link
        className="pane_listing_button view"
        to={'/listing/' + item.id}
      >
        View
      </Link>
    </div>
  );
};

module.exports = HistoricalListItem;
