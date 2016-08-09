import React from 'react';
import { connect } from 'react-redux';
import ListEntry from './ListEntry.jsx';
import itemActions from '../actions/itemActions.js';


let ListView = ({ dispatchGetItems, items }) => {
  return (
    <div className="listView_container">
      {items.filter(val => val.status === true).map((item, i) => {
        return <ListEntry key={i} entry={item} />
      })}

    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    items: state.items.items,
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
