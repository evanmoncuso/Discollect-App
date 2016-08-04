import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './NavBar';
// import { Link } from 'react-router';

class Dashboard extends React.Component {
  constructor (props) {
    super(props);
  }
  render() {
    return(
      <div>
        <NavBar />
        <div>
          <h1>Dashboard</h1>
          <img src="https://huxley.wwu.edu/sites/huxley.wwu.edu/files/default_images/user-icon.png"/>
          <div className="about"></div>
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
}

export default Dashbaord;