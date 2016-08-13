import React from 'react';
import { connect } from 'react-redux';

const AccountInfo = ({ username, toggleHistory, view }) => (
  <div className="account_info">
    <div className="user_picture">
      <img src="https://huxley.wwu.edu/sites/huxley.wwu.edu/files/default_images/user-icon.png" alt="user" />
    </div>
    <div className="about">{username ? username : 'NOT A VALID USER'}</div>
    <button
      onClick={() => toggleHistory()}
      className="account_history"
    >
      { view ? 'show history' : 'hide history'}
    </button>
  </div>
);
  const mapStateToProps = (state) => {
    return {
      username: state.users.username,
      userId: state.users.id,
    };
  };

  export default connect(mapStateToProps)(AccountInfo);
