import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import a from '../actions/devActions.js';

const DevSignup = ({ dispatchDevSignup, apiKey, currentEmail }) => {
  let email;
  let displayButton;
  if (apiKey) {
    displayButton = (<button type="button" className="form_submit_button" onClick={() => {
        browserHistory.push('/portal')
      }} > to Portal </button>);
  } else {
    displayButton = (<button type="submit" className="form_submit_button">create</button>);
  }

  return (
    <div className="main_container">
      <div className="dev_signup_container">
        <h1>Sign up for a Discollect API key</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!email.value.trim()) {
              return;
            }

            dispatchDevSignup(email.value);

            email.value = '';
          }}
        >
          <div className="auth_input">
            <label htmlFor="email">enter email</label>
            <input
              ref={(node) => { email = node; }}
              id="email"
              placeholder={ currentEmail }
              required
            />
          </div>
          <div className="api_key_display">
            {apiKey ? <span className="api_key_title"> Your New API key is: </span> : ''}
            <span className="api_key_span">{apiKey || ''}</span>
            {apiKey ? <span className="api_key_warning"> note: you will not have access to this key again, please record it</span> : ''}
          </div>
          <div className="button_holder">
            {displayButton}
          </div>
        </form>
      </div>
    </div>
  );
};

DevSignup.propTypes = {
  dispatchDevSignup: React.PropTypes.func,
  apiKey: React.PropTypes.string,
  currentEmail: React.PropTypes.string,
};

const mapStateToProps = (state) => (
  {
    apiKey: state.users.dev.key,
    currentEmail: state.users.email,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    dispatchDevSignup: (email) => {
      dispatch(a.createDevKey(email));
    },
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(DevSignup);
