import React from 'react';
import { connect } from 'react-redux';

import NavBar from './NavBar.jsx';

import { checkUserLogin } from '../actions/userActions.js';

const Login = ({ dispatchLogin }) => {
  const zipcodeArrayBuilder = (zipcode) => {
    const api = 'ZuYPOXpKUE8RDdLyX8t3MuU3bDjg70N6uMWjKl4E0dwDqicoqFrdamhl0AC7Bqe6';
    const request = `https://www.zipcodeapi.com/rest/${api}/radius.json/${zipcode}/50/miles`;
        fetch(request)
        .then((response) => {
          if (response.status >= 400) {
            throw new Error('Bad zipcodes response');
          }
          return response.json();
        });
        // .then(function(zipcodes) {
        //   this.setState({
        //     zipcodeArray: zipcodes
        //   })
        // })
  };
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
        }}
      >

        <label htmlFor="username">username</label>
        <input ref={(node) => { username = node; }} id="username" />

        <label htmlFor="password">password</label>
        <input ref={(node) => { password = node; }} id="password" />

        <button type="submit">add</button>
      </form>
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
