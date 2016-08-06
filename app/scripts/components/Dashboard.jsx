import React from 'react';
import { connect } from 'react-redux';


const Dashboard = ({ username, valid }) => (
  <div>
    <div className="main_container">
      <h1>Dashboard</h1>
      <img src="https://huxley.wwu.edu/sites/huxley.wwu.edu/files/default_images/user-icon.png" alt="user" />
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

const mapStateToProps = (state) => (
  {
    username: state.username,
    valid: state.valid,
  }
);

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

Dashboard.propTypes = {
  username: React.PropTypes.string,
  valid: React.PropTypes.bool,
};


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
