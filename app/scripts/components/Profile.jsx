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
      <div>
        hi
      </div>
    );
  }
}

// Profile.propTypes = {
//   params: React.PropTypes.object,
// };

// const mapStateToProps = (state) => {
//   return {
//   };
// };

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchGetUserProfile: (userID) => {
      dispatch(userActions.getUserProfile(userID));
    },
  };
};

// export default connect(mapStateToProps, mapDispatchToProps)(Profile);
export default connect(null, mapDispatchToProps)(Profile);
