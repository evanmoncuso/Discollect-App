import React from 'react';
import { Router, Route, hashHistory } from 'react-router';

import Main from './Main.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Dashboard from './Dashboard.jsx';
import CreateListing from './CreateListing.jsx';

const App = () => {
  return (
    <Router history={hashHistory}>
      <Route path="/" component={Main} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/createlisting" component={CreateListing} />
    </Router>
  );
};

export default App;
