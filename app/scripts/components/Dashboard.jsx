import React from 'react';
import { connect } from 'react-redux';
import itemActions from '../actions/itemActions.js';
import userActions from '../actions/userActions.js';
import { browserHistory } from 'react-router';

import PaneListing from './userListingParts/pane_listing_entry.jsx';
import AccountInfo from './userListingParts/AccountInfo.jsx';
import DevPortalAccess from './userListingParts/DevPortalAccess.jsx';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      historyView: true,
    };
  }

  componentWillMount() {
      this.props.dispatchGetUserListings();
      this.props.dispatchGetEmail(this.props.userID);
  }

  closeListingHandler(listingID) {
    this.props.dispatchCloseListing(listingID, this.props.userID);
  }

  toggleHistory() {
    this.props.dispatchCallForHistory(this.props.userID);
    browserHistory.push('/history/' + this.props.userID);
  }

  render() {
    return (
      <div>
        <div className="main_container dashboard_container">
          <h1>Dashboard</h1>
          <AccountInfo
            view={this.state.historyView}
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
              <div>
                <div className="waiting_heading">
                  <h2>Waiting Items</h2>
                </div>
                <div className="waiting_items">
                  {this.props.waitingTakenItems.map((item, i) => {
                    return <PaneListing
                      key={i}
                      item={item}
                    />
                  })}
                </div>
              </div>
            </div>
          </div>
          <div>
            <DevPortalAccess />
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
    activeGivingItems: state.items.userListings.active,
    pendingGivingItems: state.items.userListings.pending,
    waitingTakenItems: state.items.userListings.waiting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchGetUserListings: (userID) => {
      dispatch(itemActions.getUsersListings());
    },
    dispatchCloseListing: (listingID) => {
      dispatch(itemActions.closeListing(listingID));
    },
    dispatchRemoveListing: (listingID) => {
      dispatch(itemActions.removeListing(listingID));
    },
    dispatchCallForHistory: (userID) => {
      dispatch(itemActions.getUserHistory(userID));
    },
    dispatchGetEmail: (userID) => {
      dispatch(userActions.getUserInfo());
    },
  };
};

Dashboard.propTypes = {
  username: React.PropTypes.string,
  valid: React.PropTypes.bool,
  userListings: React.PropTypes.array,
  dispatchGetUserListings: React.PropTypes.func,
  dispatchCloseListing: React.PropTypes.func,
  waitingTakenItems: React.PropTypes.array,
};


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
