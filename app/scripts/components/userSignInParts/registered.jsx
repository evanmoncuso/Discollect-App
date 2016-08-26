import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { logoutUserClient, logoutUserServer } from '../../actions/userActions.js';

const Registered = ({ dispatchLogout, username, image }) => (
  <div className="auth_points">
    <Link to="/dashboard">
      <span className="button dashboard">dashboard</span>
    </Link>
    <Link to="/createListing">
      <span className="button create">create</span>
    </Link>
    <Link to="/" onClick={dispatchLogout}>
      <span className="button logout">logout</span>
    </Link>
  </div>
);

Registered.propTypes = {
  dispatchLogout: React.PropTypes.func,
  username: React.PropTypes.string,
};

const mapStateToProps = (state) => (
  {
    image: state.users.picReference,
  }
);


const mapDispatchToProps = (dispatch) => (
  {
    dispatchLogout: () => {
      dispatch(logoutUserClient());
      logoutUserServer();
    },
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Registered);

// <img src={image || 'http://xacatolicos.com/app/images/avatar/icon-user.png' } style={{width:'50px', height:'50px', borderRadius: '50%'}} />