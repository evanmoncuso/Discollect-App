import React from 'react';
import { connect } from 'react-redux';
import itemActions from '../actions/itemActions.js';


class Dashboard extends React.Component {
  constructor(props) {
    // props: username, valid
    super(props);
    this.state = {
      tableView: true,
    };
    this.toggleTableView = this.toggleTableView.bind(this);
    // console.log('***', this.props.userID);
  }
  componentWillMount() {
    // console.log('HELLO');
    if (this.props.userID) {
      this.props.dispatchGetUserListings(this.props.userID);
    } // change dynamic id
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
                <td>Active Listings</td>
                <td>Pending Listings</td>
                <td>Archived Taken Listings</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><br />{this.props.activeGivingItems.map((a, i) => {
                  // console.log(this.props.userListings);
                  return <div key={i} style={{border: '1px solid black'}}>
                    <h3>{"title: "+a.title}</h3>
                    <img style={{width:'50px', height:'50px'}} src={a.picReference || 'http://www.novelupdates.com/img/noimagefound.jpg'} />
                    <p>{"id:" + a.id}</p>
                    <p>{"create at: "+ a.createdAt}</p>
                    <button>View Listing</button>
                    <button>Edit Listing</button>
                    <button>Close Listing</button>
                  </div>})}<br />
                </td>
                <td><br />{this.props.pendingGivingItems.map((a, i) => {
                  // console.log(this.props.userListings);
                  return <div key={i} style={{border: '1px solid black'}}>
                    <h3>{"title: "+a.title}</h3>
                    <img style={{width:'50px', height:'50px'}} src={a.picReference || 'http://www.novelupdates.com/img/noimagefound.jpg'} />
                    <p>{"id:" + a.id}</p>
                    <p>{"create at: "+ a.createdAt}</p>
                    <button>View Listing</button>
                    <button>Close Listing</button>
                  </div>})}<br />
                </td>
                <td><br />{this.props.archivedTakenItems.map((a, i) => {
                  // console.log(this.props.userListings);
                  return <div key={i} style={{border: '1px solid black'}}>
                    <h3>{"title: "+a.title}</h3>
                    <img style={{width:'50px', height:'50px'}} src={a.picReference || 'http://www.novelupdates.com/img/noimagefound.jpg'} />
                    <p>{"id:" + a.id}</p>
                    <p>{"create at: "+ a.createdAt}</p>
                  </div>})}<br />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('state:>>>>>>>>>>>>>>>>>>>>>>', state);
  return {
    username: state.username,
    userID: state.users.id,
    valid: state.valid,
    activeGivingItems: state.usersListings.filter(item => (
      item.giverId === state.users.id && item.status === 0
    )),
    pendingGivingItems: state.usersListings.filter(item => (
      item.giverId === state.users.id && item.status === 1
    )),
    archivedTakenItems: state.usersListings.filter(item => (
      item.takerId === state.users.id && item.status === 1
    )),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchGetUserListings: (userID) => {
      dispatch(itemActions.getUsersListings(userID));
    },
    dispatchListingStatusChange: (listingID) => {
      dispatch(itemActions.updateListingStatus(listingID));
    },
  };
};

Dashboard.propTypes = {
  username: React.PropTypes.string,
  valid: React.PropTypes.bool,
  userListings: React.PropTypes.array,
  dispatchGetUserListings: React.PropTypes.func,
};


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

    // <div className="activeListings">activeListings</div>
    // <div className="pendingOrders">pendingOrders</div>
    // <div className="listingsHistory">listingsHistory</div>
    // <div className="ordersHistory">ordersHistory</div>
