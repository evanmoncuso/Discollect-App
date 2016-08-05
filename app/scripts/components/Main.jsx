import React from 'react';
import { connect } from 'react-redux';

import NavBar from './NavBar.jsx';

let Main = () => {
  return (
    <div>
      <NavBar />
      <div className="main_container">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim venium, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
      </div>
    </div>
  );
};

// const mapStateToProps = (state) => {
//   return {
//   };
// }
//
// const mapDispatchToProps = (dispatch) => {
//   return {
//   }
// }
//
// Main = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Main);

export default Main;
