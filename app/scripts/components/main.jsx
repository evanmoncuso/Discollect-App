import React from 'react';
import { connect } from 'react-redux';

import NavBar from './NavBar.jsx';

let Main = () => {
  return (
    <div>
      <NavBar />
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
)(Main);

module.exports = Main;
