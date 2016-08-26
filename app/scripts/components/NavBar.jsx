import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Registered from './userSignInParts/Registered.jsx';
import Unregistered from './userSignInParts/Unregistered.jsx';

const hideSearch = {
  login: true,
  create: true,
  signup: true,
  portal: true,
  portalMap: true,
};

const NavBar = ({ username, image }) => {
  let displayed = username ? <Registered username={username} /> : <Unregistered />;
  let welcome = username ? <h4>Welcome {username}</h4> : '';
  return (
    <nav>
      <div className="nav_container">
        <div className="nav_title">
          <Link to="/"><h1>Discollect</h1></Link>
          <Link to="/dashboard">{welcome}</Link>
        </div>
        <div className="user_points">
          {displayed}
        </div>
      </div>
    </nav>
  );
};

Registered.propTypes = {
  username: React.PropTypes.string,
};

const mapStateToProps = (state) => (
  {
    username: state.users.username,
    image: state.users.picReference,
  }
);

export default connect(mapStateToProps)(NavBar);
