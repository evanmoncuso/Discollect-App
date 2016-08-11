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
      <Link to="/">
        <div className="nav_title">
          <h1>Discollect</h1>
          {welcome}
        </div>
      </Link>
      {displayed}
      <SearchBar />
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
