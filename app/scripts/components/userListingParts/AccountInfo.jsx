import React from 'react';
import { connect } from 'react-redux';

const AccountInfo = ({ username, toggleHistory, view }) => (
  <div className="account_info">
    <div className="top_row_container">
      <div className="image_and_label">
        <img src="https://huxley.wwu.edu/sites/huxley.wwu.edu/files/default_images/user-icon.png" alt="user" />
        <div className="about">{username ? username : 'NOT A VALID USER'}</div>
      </div>
      <div className="display_history_container">
        <button onClick={() => toggleHistory()}>{ view ? 'show history' : 'hide history'}</button>
      </div>
    </div>
  </div>
);
  const mapStateToProps = (state) => {
    return {
      username: state.users.username,
      userId: state.users.id,
    };
  };

  export default connect(mapStateToProps)(AccountInfo);
