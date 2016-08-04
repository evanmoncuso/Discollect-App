import React from 'react';
import { Router, Router, hashHistory, IndexRoute } from 'react-router';
import { connect } from 'react-redux';

import NavBar from './navBar.jsx';
import SearchBar from './navBar.jsx';
import Listings from './navBar.jsx';


let Main = () => {
  return (
    <div>
      <NavBar />
      <SearchBar />
      <Listings />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

Main = connect(
  mapStateToProps,
  mapDispatchToProps
)(Listings);

module.exports = Main;
