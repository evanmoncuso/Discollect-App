import React from 'react';
import { Router, Router, hashHistory, IndexRoute } from 'react-router';
import { connect } from 'react-redux';

import Main from './main.jsx';

let App = () => {
  return (
    <Router history={hashHistory}>
      <Route to='/' component={Main}></Route>
      <Route to='/login' component={login}></Route>
      <Route to='/signup' component={signup}></Route>
      <Route to='/dashboard' component={dashboard}></Route>
      <Route to='/createlisting' component={create}></Route>
    </Router>
  );
};

module.exports = App;
