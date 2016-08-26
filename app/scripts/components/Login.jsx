import React from 'react';
import { connect } from 'react-redux';

import { checkUserLogin } from '../actions/userActions.js';

const Login = ({ dispatchLogin }) => {
  let username;
  let password;
  return (
    <div className="main_container">
      <div className="login_container">
        <h1>Login</h1>
        <form
          className="login_form"
          onSubmit={(e) => {
            e.preventDefault();
            if (!username.value.trim() && !password.value.trim()) {
              return;
            }
            dispatchLogin(username.value, password.value);

            username.value = '';
            password.value = '';
          }}
        >
          <div className="auth_input">
            <label htmlFor="username">Username:</label>
            <input ref={(node) => { username = node; }} id="username" type="text"/>
          </div>
          <div className="auth_input">
            <label htmlFor="password">Password:</label>
            <input ref={(node) => { password = node; }} id="password" type="password" />
          </div>

          <div className="button_container">
            <button type="submit" className="blue_button">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

Login.propTypes = {
  dispatchLogin: React.PropTypes.func,
};

// const mapStateToProps = (state) => {
//   return {

//   };
// };


const mapDispatchToProps = (dispatch) => (
  {
    dispatchLogin: (user, pass) => {
      dispatch(checkUserLogin(user, pass));
    },
  }
);

export default connect(null, mapDispatchToProps)(Login);
