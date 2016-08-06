import React from 'react';


import { createUser } from '../actions/userActions.js';

const Signup = () => {
  let username;
  let password;
  let confirm;
  let email;
  let zip;

  return (
    <div className="main_container">
      <h2>Signup</h2>
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
          createUser(username.value, password.value, email.value, zip.value);
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

module.exports = Signup;
