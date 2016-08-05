import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { connect } from 'react-redux';

import Main from './Main.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Dashboard from './Dashboard.jsx';
import CreateListing from './CreateListing.jsx';

let App = () => {
  return (
    <Router history={hashHistory}>
      <Route path='/' component={Main}></Route>
      <Route path='/login' component={Login}></Route>
      <Route path='/signup' component={Signup}></Route>
      <Route to='/dashboard' component={Dashboard}></Route>
      <Route to='/createlisting' component={CreateListing}></Route>
    </Router>
  );
};

export default App;
