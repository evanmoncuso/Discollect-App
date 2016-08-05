import React from 'react';
import NavBar from './NavBar.jsx';

import { connect } from 'react-redux';

let Dashboard = ({ username, valid }) => {
  return(
    <div>
      <NavBar />
      <div className="main_container">
        <h1>Dashboard</h1>
        <img src="https://huxley.wwu.edu/sites/huxley.wwu.edu/files/default_images/user-icon.png"/>
        <div className="about">{valid ? username : 'NOT A VALID USER'}</div>
        <div>
          <div className="activeListings">activeListings</div>
          <div className="pendingOrders">pendingOrders</div>
          <div className="listingsHistory">listingsHistory</div>
          <div className="ordersHistory">ordersHistory</div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    username: state.username,
    valid: state.valid
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

Dashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

export default Dashboard;
