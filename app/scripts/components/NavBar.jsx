import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

let NavBar = () => {
  return (
    <nav>
      <Link to='/'><h2 className="nav_title">Home</h2></Link>
      <div className="auth_points">
        <Link to='/login'><span className="button login">login</span></Link>
        <Link to='/signup'><span className="button signup">signup?</span></Link>
      </div>
      <Link to='/dashboard'></Link>
    </nav>
  );
};

export default NavBar;
