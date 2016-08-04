import React from 'react';
import { connect } from 'react-redux';

let Login = () => {
  let username, password;
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={(e) => {
          e.preventDefault();
          if (!username.value.trim() && !password.value.trim()) {
            return;
          }
          console.log(username.value);
          console.log(password.value);
        }}>

        <label>username</label>
        <input ref={(node) => username = node } />

        <label>password</label>
        <input ref={(node) => password = node } />

        <button type="submit">add</button>
      </form>
    </div>
  );
};

// const mapStateToProps = (state) => {
//   return {
//   }
// }
//
// const mapDispatchToProps = (dispatch) => {
//   return {
//
//   }
// }
//
// Login = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Login);

module.exports = Login;
