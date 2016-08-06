import React from 'react';
import { connect } from 'react-redux';

import NavBar from './NavBar.jsx';
import ListView from './ListView.jsx';
import itemActions from '../actions/itemActions.js';
import SearchBar from './SearchBar.jsx';

let Main = () => {
  return (
    <div>
      <NavBar />
      <ListView />
    </div>
  );
};


export default Main;
