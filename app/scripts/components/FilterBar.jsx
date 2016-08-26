import React from 'react';
import { connect } from 'react-redux';
import itemActions from '../actions/itemActions.js';

const FilterBar = (props) => {
  let _new, _excellent, _good, _fair, _salvage, _desc, _zip, _cat, _rating = 0;
  return (
    <div className="filterBar">
      <form
        onSubmit={e => {
          e.preventDefault();
          let query = {
            zipcode: _zip.value,
            category: _cat.value, // doesn't need to be in an array unless we allow multi-cats
            condition: [(_new.checked ? 5 : 0), (_excellent.checked ? 4 : 0), (_good.checked ? 3 : 0), (_fair.checked ? 2 : 0), (_salvage.checked ? 1 : 0)],
            desc: _desc.value,
          };
          props.dispatchGetSQLListings(query);
        }}
      >
        <fieldset className="condition_container">
          <legend>Condition:</legend>
            <div className="labelled_checkbox">
              <label htmlFor="new">New</label>
              <input id="new" type="checkbox" value="5" ref={(node) => { _new = node; }} defaultChecked />
            </div>
            <div className="labelled_checkbox">
              <label htmlFor="exc">Excellent</label>
              <input id="exc" type="checkbox" value="4" ref={(node) => { _excellent = node; }} defaultChecked />
              </div>
            <div className="labelled_checkbox">
              <label htmlFor="good">Good</label>
              <input id="good" type="checkbox" value="3" ref={(node) => { _good = node; }} defaultChecked />
            </div>
            <div className="labelled_checkbox">
              <label htmlFor="fair">Fair</label>
              <input id="fair" type="checkbox" value="2" ref={(node) => { _fair = node; }} defaultChecked />
            </div>
            <div className="labelled_checkbox">
              <label htmlFor="salv">Salvage</label>
              <input id="salv" type="checkbox" value="1" ref={(node) => { _salvage = node; }} defaultChecked />
            </div>
        </fieldset>
        <fieldset>
          <legend>Categories:</legend>
          <select ref={(node) => { _cat = node; }} id="category" required>
            <option value="all-categories">All Categories</option>
            <option value="appliances">Appliances</option>
            <option value="fashion">Clothing, Shoes &amp; Jewelry</option>
            <option value="furniture">Furniture</option>
            <option value="books">Books</option>
            <option value="electronics">Electronics</option>
            <option value="tools">Tools &amp; Home Improvement</option>
          </select>
        </fieldset>
        <fieldset>
          <legend>Search Description:</legend>
          <input type="text" ref={(node) => { _desc = node; }} />
        </fieldset>
        <fieldset>
          <legend>Location:</legend>
            <label htmlFor="zip">Zip Code</label>
            <input type="text" ref={(node) => { _zip = node; }} />
        </fieldset>
        <div className="button_container">
          <button
            type="submit"
            className="blue_button"
          >Filter</button>
        </div>
      </form>
    </div>
  );
};

FilterBar.propTypes = {
  dispatchGetSQLListings: React.PropTypes.func,
};

const mapDispatchToProps = (dispatch) => (
  {
    dispatchGetSQLListings: (query) => {
      dispatch(itemActions.getSQLListings(query));
    },
  }
);

export default connect(null, mapDispatchToProps)(FilterBar);
