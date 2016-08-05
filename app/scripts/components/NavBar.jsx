import React from 'react';
import { Link } from 'react-router';

let NavBar = () => {
  return (
    <nav>
      <Link to="/"><h2 className="nav_title">Home</h2></Link>
      <div className="nav_points">
        <div className="app_points">
          <Link to="/dashboard"><span className="button dashboard">dashboard</span></Link>
          <Link to="/createListing"><span className="button create">create</span></Link>
        </div>
        <div className="auth_points">
          <Link to="/login"><span className="button login">login</span></Link>
          <Link to="/signup"><span className="button signup">signup</span></Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
