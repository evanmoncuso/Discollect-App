import React from 'react';
import { connect } from 'react-redux';
import ListEntry from './ListEntry.jsx'
import itemActions from '../actions/itemActions.js';


let ListView = ({ dispatchGetItems, items }) => {
  return (
    <div className="ListView_container">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim venium, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
      <button onClick={() => {
          dispatchGetItems();
      }}>
        button
      </button>
      <ul>
        {items.filter(val => val.status === true).map((item, i) => {
          return <ListEntry key={i} entry={item} />
        })}
      </ul>
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