import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { logoutUserClient, logoutUserServer } from '../../actions/userActions.js';

const Registered = ({ dispatchLogout, username }) => (
  <div className="app_points">
    <h3>Welcome {username}</h3>
    <Link to="/dashboard"><span className="button dashboard">dashboard</span></Link>
    <Link to="/createListing"><span className="button create">create</span></Link>
    <a onClick={dispatchLogout}>
      <span className="button logout">logout</span>
    </a>
  </div>
);

Registered.propTypes = {
  dispatchLogout: React.PropTypes.func,
  username: React.PropTypes.string,
};


const mapDispatchToProps = (dispatch) => (
  {
    dispatchLogout: () => {
      dispatch(logoutUserClient());
      logoutUserServer();
    },
  }
);

export default connect(null, mapDispatchToProps)(Registered);
