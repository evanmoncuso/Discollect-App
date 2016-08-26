import React from 'react';
import { connect } from 'react-redux';
import itemActions from '../actions/itemActions.js';
import GoogMap from './GoogMap.jsx';

const CreateListing = ({ dispatchCreateNewListing,  id }) => {
  let title;
  let image;
  let category;
  let description;
  let condition;
  let latLng = '0, 0';
  let fileTypeLocal = null;
  let filenameLocal = null;
  let imageLocal = null;

  const handleChange = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onload = (upload) => {
      imageLocal = upload.target.result;
      filenameLocal = file.name;
      fileTypeLocal = file.type;
    };

    reader.readAsDataURL(file);
  };

  const changeCoords = (latitude, longitude) => {
    latLng = `${latitude},${longitude}`;
  };

  return (
    <div>
      <div className="main_container create_listing_container">
        <h1>Create a Listing</h1>
        <form encType="multipart/form-data"
          onSubmit={(e) => {
            e.preventDefault();
            const data = {
              title: title.value,
              status: 0,
              giverId: id,
              takerId: null,
              picReference: imageLocal,
              filename: filenameLocal,
              filetype: fileTypeLocal,
              category: category.value,
              description: description.value,
              condition: condition.value,
              coordinates: latLng,
            };

            dispatchCreateNewListing(data);

            title.value = '';
            image.value = '';
            category.value = 'all-categories';
            description.value = '';
            condition.value = '5';
            latLng = '0, 0';
          }}
        >
          <div className="auth_input">
            <label htmlFor="title">Title:</label>
            <input ref={(node) => { title = node; }} id="title" type='text' required />
          </div>
          <div className="auth_input">
            <label htmlFor="category">Categories:</label>
            <select ref={(node) => { category = node; }} id="category" required>
              <option value="all-categories">All Categories</option>
              <option value="appliances">Appliances</option>
              <option value="fashion">Clothing, Shoes &amp; Jewelry</option>
              <option value="furniture">Furniture</option>
              <option value="books">Books</option>
              <option value="electronics">Electronics</option>
              <option value="tools">Tools &amp; Home Improvement</option>
            </select>
          </div>
          <div className="map_container" style={{ width: '400px', height: '400px', margin: '0 auto' }}>
            <label htmlFor="location">Location</label>
            <GoogMap changeCoords={changeCoords} />
          </div>
          <div className="auth_input">
            <label htmlFor="condition" >Condition:</label><br />
            <select ref={(node) => { condition = node; }} id="condition" required>
              <option value="5">New</option>
              <option value="4">Excellent</option>
              <option value="3">Good</option>
              <option value="2">Fair</option>
              <option value="1">Salvage</option>
            </select>
          </div>
          <div className="image_input">
            <label htmlFor="image">Upload Image</label>
            <input
              ref={(node) => { image = node; }}
              name="image"
              id="image"
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="file_input"
            />
          </div>
          <div className="auth_input">
            <label htmlFor="description">Description:</label>
            <textarea ref={(node) => { description = node; }} id="description" required />
          </div>
          <div className="button_container">
            <button type="submit" className="blue_button">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
};

CreateListing.propTypes = {
  dispatchCreateNewListing: React.PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    id: state.users.id,
  };
};

const mapDispatchToProps = (dispatch) => (
  {
    dispatchCreateNewListing: (data) => {
      dispatch(itemActions.postNewListing(data));
    },
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(CreateListing);
