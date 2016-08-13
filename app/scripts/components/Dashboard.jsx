import React from 'react';
import { connect } from 'react-redux';
import itemActions from '../actions/itemActions.js';
import { browserHistory } from 'react-router';

import PaneListing from './userListingParts/pane_listing_entry.jsx';
import AccountInfo from './userListingParts/AccountInfo.jsx';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      historyView: true,
    };
  }

  componentWillMount() {
    if (this.props.userID) {
      this.props.dispatchGetUserListings(this.props.userID);
    }
  }

  closeListingHandler(listingID) {
    this.props.dispatchCloseListing(listingID, this.props.userID);
  }

  toggleHistory() {
    this.setState({
      historyView: !this.state.historyView,
    });
  }

  render() {
    return (
      <div>
        <div className="main_container dashboard_container">
          <h1>Dashboard</h1>
          <AccountInfo
            toggleHistory={this.toggleHistory.bind(this)} username={this.props.username}
          />
          <div className="user_items_container">
            <div className="user_items">
              <div className="active_heading">
                <h2>Active Items</h2>
              </div>
              <div className="active_items">
                {this.props.activeGivingItems.map((item, i) => {
                  return <PaneListing
                    key={i}
                    item={item}
                    removeable={true}
                    />
                })}
              </div>
            </div>
            <div className="user_items">
              <div className="pending_heading">
                <h2>Pending Items</h2>
              </div>
              <div className="pending_items">
                {this.props.pendingGivingItems.map((item, i) => {
                  return <PaneListing
                    key={i}
                    item={item}
                    closeable={true}
                  />
                })}
              </div>
            </div>
            <div className="user_items">
              {this.state.historyView ? (
                <div>
                  <div className="archive_heading">
                    <h2>Archive Items</h2>
                  </div>
                  <div className="archive_items">
                    {this.props.archivedTakenItems.map((item, i) => {
                      return <PaneListing
                        key={i}
                        item={item}
                      />
                    })}
                  </div>
                </div>
              ) : ' '}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.users.username,
    userID: state.users.id,
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
    dispatchCloseListing: (listingID) => {
      dispatch(itemActions.closeListing(listingID));
    },
    dispatchRemoveListing: (listingID) => {
      dispatch(itemActions.removeListing(listingID));
    },
  };
};

Dashboard.propTypes = {
  username: React.PropTypes.string,
  valid: React.PropTypes.bool,
  userListings: React.PropTypes.array,
  dispatchGetUserListings: React.PropTypes.func,
  dispatchCloseListing: React.PropTypes.func,
};


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
