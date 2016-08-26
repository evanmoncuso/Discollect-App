import React from 'react';
import { connect } from 'react-redux';
import userActions from '../../actions/userActions.js';
import itemActions from '../../actions/itemActions.js';

const AccountInfo = ({ username, avgRating, dispatchGetUserHistory, dispatchIndivItem, toggleHistory, view, userId, dispatchUploadProfilePic, picReference}) => {
  let image;
  let filename;
  let filetype;
  let profileImage = picReference ? picReference : "https://huxley.wwu.edu/sites/huxley.wwu.edu/files/default_images/user-icon.png";

    const encodeImage = (element) => {
    const reader = new FileReader();
    const file = element.target.files[0];
    reader.onload = (upload) => {
      image = upload.target.result;
      filename = file.name;
      filetype = file.type;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="account_info">
      <div className="user_picture">
        <img src={profileImage} alt="user" height={320} />
      </div>
      <div className="about">{username ? username : 'NOT ACTIVE USER'}</div>
      <div className="about">Rating: {avgRating ? avgRating : ''}</div>
        <div className="button_container">
          <button
            className="blue_button view"
            onClick={() => {
              dispatchGetUserHistory(userId);
          }}>
            History
          </button>
        </div>
        <form encType="multipart/form-data" onSubmit={(e)=>{
          e.preventDefault();
          const data = {
            picReference: image,
            filename: filename,
            filetype: filetype,
            giverId: userId,
            profile: true,
          };

          dispatchUploadProfilePic(data);
        }}>
        <div className="auth_input">
          <label htmlFor="image">Upload Profile Pic</label><br />
          <input
            ref={(node) => { image = node; }}
            name="photo"
            type="file"
            accept="image/*"
            onChange={encodeImage}
          />
        </div>
        <div className="button_container">
          <button type="submit" className="blue_button">Upload</button>
        </div>
      </form>
    </div>
  );
};

AccountInfo.propTypes = {
  dispatchUploadProfilePic: React.PropTypes.func,
};

  const mapDispatchToProps = (dispatch) => (
  {
    dispatchUploadProfilePic: (data) => {
      dispatch(userActions.uploadProfilePic(data));
    },
    dispatchGetUserHistory: (userId) => {
      dispatch(itemActions.getUserHistory(userId));
    },
  }
);

  const mapStateToProps = (state) => {
    return {
      username: state.users.username,
      userId: state.users.id,
      picReference: state.users.picReference,
      avgRating: state.users.avgRating,
    };
  };

  export default connect(mapStateToProps, mapDispatchToProps)(AccountInfo);
