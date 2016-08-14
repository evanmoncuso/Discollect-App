import React from 'react';
import { connect } from 'react-redux';
import userActions from '../actions/userActions.js';

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    this.props.dispatchGetUserProfile(this.props.params.id);
  }
  render() {
    return (
      <div className="main_container profile">
        <div className="account_info">
          <div className="user_picture">
            <img src={this.props.picReference} alt="user" height="320px"/>
          </div>
          <div className="profile_name">
            {this.props.username}
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  params: React.PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    username: state.profileView.username,
    zipcode: state.profileView.zipcode,
    rating: state.profileView.rating,
    picReference: state.profileView.picReference,
    email: state.profileView.email
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchGetUserProfile: (userID) => {
      dispatch(userActions.getUserProfile(userID));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
