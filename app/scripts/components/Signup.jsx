import React from 'react';
import { connect } from 'react-redux';


import { createUser } from '../actions/userActions.js';

const Signup = ({ dispatchSignup }) => {
  let username;
  let password;
  let confirm;
  let email;
  let zip;
  console.log(dispatchSignup);
  return (
    <div className="main_container">
      <h1>Signup</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!username.value.trim() &&
              !password.value.trim() &&
              !email.value.trim()) {
            return;
          }

          if (password.value !== confirm.value) {
            console.log('passwords do not match');
            return;
          }
          dispatchSignup(username.value, password.value, email.value, zip.value);
        }}
      >

        <label htmlFor="username">Username</label>
        <input ref={(node) => { username = node; }} id="username" type="text" required />

        <label htmlFor="password1">Password</label>
        <input ref={(node) => { password = node; }} id="password1" type="password" required />

        <label htmlFor="password2">Confirm Password</label>
        <input ref={(node) => { confirm = node; }} id="password2" type="password" required />

        <label htmlFor="email">Email</label>
        <input ref={(node) => { email = node; }} id="email" type="email" required />

        <label htmlFor="zip">Zip Code</label>
        <input ref={(node) => { zip = node; }} id="zip" required />

        <button type="submit">Create</button>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => (
  {
    dispatchSignup: (username, password, email, zip) => {
      dispatch(createUser(username, password, email, zip));
    },
  }
);

export default connect(null, mapDispatchToProps)(Signup);

