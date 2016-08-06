import React from 'react';
import { connect } from 'react-redux';

import NavBar from './NavBar.jsx';

import { checkUserLogin } from '../actions/userActions.js';

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

let Login = ({ dispatchLogin }) => {
  let username;
  let password;
  return (
    <div className="main_container">
      <NavBar />
      <h2>Login</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!username.value.trim() && !password.value.trim()) {
            return;
          }
          dispatchLogin(username.value, password.value);

          username.value = '';
          password.value = '';
          console.log(username.value);
          console.log(password.value);
          zipcodeArrayBuilder(zipcode);
        }}>

        <label>username</label>
        <input ref={(node) => { username = node; }} />

        <label>password</label>
        <input ref={(node) => { password = node; }} />

        <button type="submit">add</button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {

  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    dispatchLogin: (user, pass) => {
      dispatch(checkUserLogin(user, pass));
    },
  };
};

Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

export default Login;
