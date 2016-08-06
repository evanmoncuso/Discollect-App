import React from 'react';
import { connect } from 'react-redux';

import NavBar from './NavBar.jsx';
import itemActions from '../actions/itemActions.js';
import SearchBar from './SearchBar.jsx';

let Main = ({ dispatchGetItems, items }) => {
  return (
    <div>
      <NavBar />
      <SearchBar />
      <div className="main_container">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim venium, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
        <ul>
          {items.map((item, i) => {
            return <li key={i}> {item.title} </li>
          })}
        </ul>
      </div>
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

Main = connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);

export default Main;
