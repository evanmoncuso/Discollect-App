import React from 'react';
import { connect } from 'react-redux';
import { checkDevStatus } from '../../actions/devActions.js';


const DevPortalAccess = ({ userEmail, dispatchDevValidation }) => {
  return (
    <div className="main_container dev_portal_access">
      <div>Access the Developer Portal</div>
      <button
        onClick={() => {
            console.log('1', userEmail);
            dispatchDevValidation(userEmail);
          }
        }
        className="account_history"
      >
        Access Dev Portal
      </button>
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
      console.log('2', email);
      dispatch(checkDevStatus(email));
    },
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(DevPortalAccess);
