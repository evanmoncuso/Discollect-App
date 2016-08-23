import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';


const HistoricalListItem = ({ item, userId, rating, dispatchCreateRating }) => {
  const timeAgo = moment(item.updatedAt).fromNow();
  let classes = 'hist_list_item ';
  classes += item.giverId === userId ? 'left_hist' : 'right_hist';

  let flagSide = 'flag ';
  flagSide += item.giverId === userId ? 'right_flag' : 'left_flag';

  return (
    <div className={classes}>
      <div className="data_container">
        <h3>{item.title}</h3>
        <span>{item.giver}</span>
        <span>{item.description}</span>
        <span>{timeAgo}</span>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
 return {
    userId: state.users.id,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchCloseListing: (listingId) => {
      dispatch(itemActions.closeListing(listingId));
    },
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(HistoricalListItem);
