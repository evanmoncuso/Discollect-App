import React from 'react';
import { connect } from 'react-redux';
import ListEntry from './ListEntry.jsx';
import itemActions from '../actions/itemActions.js';
import { browserHistory } from 'react-router';

function trigger(data) {
  browserHistory.push('/listing/' + data)
}

let ListView = ({ dispatchGetItems, items, users }) => {
  return (
    <div className="main_container listings_container">
      {items.map((item, i) => {
        return <ListEntry key={i} entry={item} action={ (e) => trigger(item.id)} />
      })}

    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    items: state.items.items,
    users: state.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchGetItems: () => {
      dispatch(itemActions.populateInitialListings());
    },
  };
};

ListView = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListView);

export default ListView;
