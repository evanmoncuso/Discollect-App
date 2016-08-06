import React from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import NavBar from './NavBar.jsx';
import Categories from './categories.jsx';
import { postNewListing } from '../actions/actions.js';

const CreateListing = (props) => {
  let title;
  let zip;
  let image;
  let category;
  let description;
  let condition;
  return (
    <div>
      <NavBar />
      <div className="main_container">
        <h1>Create a Listing</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            // if (!title.value.trim() && !zip.value.trim()) {
            //   console.log('empty inputs');
            //   return;
            // }

            const data = {
              title: title.value,
              zip: zip.value,
              image: image.value,
              category: category.value,
              description: description.value,
              condition: condition.value,
            };
            // console.log(data);
            props.dispatchCreateNewListing(data);
          }}
        >
          <label htmlFor="title">Title</label>
          <input ref={(node) => { title = node; }} id="title" required />
          <label htmlFor="zip" >Zip Code</label>
          <input ref={(node) => { zip = node; }} id="zip" required />
          <label htmlFor="category">Categories</label>
          <br />
          <Categories ref={(node) => { category = node; }} id="category" />
          <br />
          <label htmlFor="condition" >Condition</label><br />
          <select ref={(node) => { condition = node; }} id="condition" required>
            <option value="5">New</option>
            <option value="4">Excellent</option>
            <option value="3">Good</option>
            <option value="2">Fair</option>
            <option value="1">Salvage</option>
          </select><br />
          <label htmlFor="image">Image</label><br />
          <input ref={(node) => { image = node; }} type="file" accept="image/*" required />
          <label htmlFor="description">Description</label>
          <textarea ref={(node) => { description = node; }} id="description" required />
          <button type="submit">add</button>
        </form>
      </div>
    </div>
  );
};

CreateListing.propTypes = {
  dispatchCreateNewListing: React.PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatchCreateNewListing: (data) => {
      dispatch(postNewListing(data));
    },
  };
}
export default connect(mapDispatchToProps)(CreateListing);
