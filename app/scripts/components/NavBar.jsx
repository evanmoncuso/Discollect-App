import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import SearchBar from './SearchBar.jsx';
import Registered from './userSignInParts/Registered.jsx';
import Unregistered from './userSignInParts/Unregistered.jsx';


const NavBar = ({ username }) => {
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
        <SearchBar />
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
  }
);

export default connect(mapStateToProps)(NavBar);
