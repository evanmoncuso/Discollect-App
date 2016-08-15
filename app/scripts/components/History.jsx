import React from 'react';
import { connect } from 'react-redux';

import HistoricalListItem from './userListingParts/HistoricalListItem.jsx';

const History = ({ userHistory }) => {
  return (
    <div className="main_container user_history">
      <div className="history_labels">
        <span className="giver">Giver</span>
        <span className="taker">Taker</span>
      </div>
      {userHistory.map((item, i) => (
        <HistoricalListItem key={i} item={item} />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => (
  {
    userHistory: state.users.history || [],
  }
);

export default connect(mapStateToProps)(History);
