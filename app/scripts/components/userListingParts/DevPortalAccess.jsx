import React from 'react';
import { connect } from 'react-redux';
import { checkDevStatus } from '../../actions/devActions.js';


const DevPortalAccess = ({ userEmail, dispatchDevValidation }) => {
  return (
    <div className="main_container dev_portal_access">
      <div>Access the Developer Portal</div>
      <div className="button_container">
        <button
          className="blue_button"
          onClick={() => {
              dispatchDevValidation(userEmail);
            }}
        >
          Access Dev Portal
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => (
  {
    userEmail: state.users.email,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    dispatchDevValidation: (email) => {
      dispatch(checkDevStatus(email));
    },
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(DevPortalAccess);
