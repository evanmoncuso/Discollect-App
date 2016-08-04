import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

let NavBar = () => {
  return (
    <nav>
      <Link to='/login'><span className="button login">login</span></Link>
      <Link to='/signup'><span className="button signup">signup</span></Link>
      <Link to='/'><h1>Home</h1></Link>
      <Link to='/dashboard'>
        <span className="button signup">dashboard</span>
      </Link>
      <Link to='/createlisting'>
        <span className="button signup">signup</span>
      </Link>
    </nav>
  );
};

// const mapStateToProps = (state) => {
//   return {
//   }
// }
//
// const mapDispatchToProps = (dispatch) => {
//   return {
//   }
// }
//
// NavBar = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(NavBar);

module.exports = NavBar;
