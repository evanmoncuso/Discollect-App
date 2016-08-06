import React from 'react';

import NavBar from './NavBar.jsx';

import { createUser } from '../actions/userActions.js';

const Signup = () => {
  let username;
  let password;
  let confirm;
  let email;
  let zip;


  zipcodeArrayBuilder = function(zipcode) {
    var api = 'ZuYPOXpKUE8RDdLyX8t3MuU3bDjg70N6uMWjKl4E0dwDqicoqFrdamhl0AC7Bqe6';
    var request = 'https://www.zipcodeapi.com/rest/' + api + '/radius.json/' + zipcode + '/50/miles';
      fetch(request)
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error('Bad zipcodes response');
        }
        return response.json();
      })
      // .then(function(zipcodes) {
      //   this.setState({
      //     zipcodeArray: zipcodes
      //   })
      // })
  }

  return (
    <div className="main_container">
      <NavBar />
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
          zipcodeArrayBuilder(zip.value);
          createUser(username.value, password.value, email.value, zip.value);
        }}>

        <label>username</label>
        <input ref={(node) => { username = node; }} />

        <label>password</label>
        <input ref={(node) => { password = node; }} />

        <label>password confirm</label>
        <input ref={(node) => { confirm = node; }} />

        <label>email</label>
        <input ref={(node) => { email = node; }} />

        <label>zip code</label>
        <input ref={(node) => { zip = node; }} />

        <button type="submit">create</button>
      </form>
    </div>
  );
};

module.exports = Signup;
