import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App.jsx';
// import Main from './Main.jsx';
import ListView from './ListView.jsx';
import Listing from './Listing.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Dashboard from './Dashboard.jsx';
import CreateListing from './CreateListing.jsx';
import Profile from './Profile.jsx';

export default (
  <Route path="/" component={App} >
    <IndexRoute component={ListView} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/listing/:id" component={Listing} />
    <Route path="/createlisting" component={CreateListing} />
    <Route path="/profile/:id" component={Profile} />
  </Route>
);



// <IndexRoute component={ListView} >
//   <Route path="listing/:id" component={ListingView} />
// </IndexRoute>