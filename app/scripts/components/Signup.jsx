import React from 'react';
import { connect } from 'react-redux';

import NavBar from './NavBar.jsx';

import { sendUserToServer } from '../actions/userActions.js';

console.log(sendUserToServer);
let Signup = () => {
  let username, password, confirm, email, zip;
  return (
    <div className="main_container">
      <NavBar />
      <h2>Signup</h2>
      <form onSubmit={(e) => {
          e.preventDefault();
          if (!username.value.trim() &&
              !password.value.trim() &&
              !email.value.trim()) {
            return;
          }
          console.log('here is the username', username.value);
          console.log('Here is the password:', password.value);
          console.log('here is the password confirm', confirm.value);
          console.log('Here is the email:', email.value);
          console.log('here is the zip', zip.value);
        }}>

        <label>username</label>
        <input ref={(node) => username = node } />

        <label>password</label>
        <input ref={(node) => password = node } />

        <label>password confirm</label>
        <input ref={(node) => confirm = node } />

        <label>email</label>
        <input ref={(node) => email = node } />

        <label>zip code</label>
        <input ref={(node) => zip = node } />

        <button type="submit">create</button>
      </form>
    </div>
  );
};

module.exports = Signup;
