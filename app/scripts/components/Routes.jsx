import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App.jsx';
// import Main from './Main.jsx';
import ListView from './ListView.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Dashboard from './Dashboard.jsx';
import CreateListing from './CreateListing.jsx';


export default (
  <Route path="/" component={App} >
    <IndexRoute component={ListView} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/createlisting" component={CreateListing} />
  </Route>
);



// <IndexRoute component={ListView} >
//   <Route path="listing/:id" component={ListingView} />
// </IndexRoute>