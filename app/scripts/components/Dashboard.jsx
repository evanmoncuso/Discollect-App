import React from 'react';
import { connect } from 'react-redux';
import itemActions from '../actions/itemActions.js';


class Dashboard extends React.Component {
  constructor(props) {
    // props: username, valid
    super(props);
    this.state = {
      tableView: true,
      activeListings: [],
      pendingOrders: [],
      listingsHistory: [],
      ordersHistory: [],
    };
    this.toggleTableView = this.toggleTableView.bind(this);
    console.log('***', this.props);
  }
  componentDidMount() {
    console.log('HELLO');
    this.props.dispatchGetUserListings();
  }
  toggleTableView() {
    this.setState({
      tableView: !this.state.tableView,
    });
  }
  render() {
    return (
      <div>
        <div className="main_container">
          <h1>Dashboard</h1>
          <img src="https://huxley.wwu.edu/sites/huxley.wwu.edu/files/default_images/user-icon.png" alt="user" />
          <div className="about">{this.props.valid ? this.props.username : 'NOT A VALID USER'}</div>
          <br />
          <h3>Acount:</h3>
          <button onClick={this.toggleTableView}>{this.state.tableView ? 'Show History' : 'Show Active'}</button>
          <table>
            <thead>
              <tr>
                <td>{this.state.tableView ? 'Active' : 'Past'} Listings</td>
                <td>{this.state.tableView ? 'Pending' : 'Past'} Orders</td>
              </tr>
              <tr>
                <td>{this.props.userListings.map((a) => {
                  return <tr><td>{a.title}</td></tr>;
                })}</td>
                <td>{this.props.userListings.map((a) => {
                  return <tr><td>{a.title}</td></tr>;
                })}</td>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  {
    username: state.username,
    valid: state.valid,
    userListings: state.userListings.userListings,
  }
);

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchGetUserListings: () => {
      dispatch(itemActions.getUsersListings());
    },
  };
};

Dashboard.propTypes = {
  username: React.PropTypes.string,
  valid: React.PropTypes.bool,
};


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

    // <div className="activeListings">activeListings</div>
    // <div className="pendingOrders">pendingOrders</div>
    // <div className="listingsHistory">listingsHistory</div>
    // <div className="ordersHistory">ordersHistory</div>
