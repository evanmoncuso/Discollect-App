import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { connect } from 'react-redux';

import Main from './Main.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';



// <Route to='/dashboard' component={dashboard}></Route>
// <Route to='/create' component={create}></Route>

let App = () => {
  return (
    <Router history={hashHistory}>
      <Route path='/' component={Main}></Route>
      <Route path='/login' component={Login}></Route>
      <Route path='/signup' component={Signup}></Route>
    </Router>
  );
};

module.exports = App;