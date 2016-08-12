import React from 'react';
import { connect } from 'react-redux';
import userActions from '../actions/userActions.js';

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    console.log(this.props.params.id);
    this.props.dispatchGetUserProfile(this.props.params.id);
  }
  render() {
    return (
      <div>
        <div>
          <img src={this.props.picReference || "https://huxley.wwu.edu/sites/huxley.wwu.edu/files/default_images/user-icon.png"} />
          <h1>{this.props.username}</h1>
        </div>
        <div>
          <div>Zipcode: {this.props.zipcode || 'N/A'}</div>
          <div>Rating: {this.props.rating || 0}</div>
          <div>Email: <a href={this.props.email}>{this.props.email || 'none'}</a></div>
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

// export default connect(mapStateToProps, mapDispatchToProps)(Profile);
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
