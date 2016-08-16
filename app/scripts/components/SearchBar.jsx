import React from 'react';
import { connect } from 'react-redux';

import itemActions from '../actions/itemActions.js';


const SearchBar = ({ commitSearch, userCoords, userZip }) => {
  let keywords;
  let zip;
  let category;
  return (
    <div className="search_bar">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const data = {
            category: category.value,
            keywords: keywords.value,
            zipcodeArray: [zip.value || userZip],
          };
          console.log(data);
          commitSearch(data);
          category.value = 'all-categories';
          keywords.value = '';
          zip.value = '';
        }}
      >
        <div className="full_input">
          <label htmlFor="keywords">keyword: </label>
          <input
            className="search_bar_input keywords"
            ref={(node) => { keywords = node; }}
            onChange={(node) => commitSearch({ keywords: node.target.value.toLowerCase() })}
          />
        </div>
        <div className="full_input">
          <label htmlFor="zip">zipcode: </label>
          <input
            className="search_bar_input zip"
            ref={(node) => { zip = node; }}
            onChange={(node) => commitSearch({ zip: node.target.value })}
          />
        </div>
        <select
          ref={(node) => { category = node; }}
          id="category"
          className="search_bar_input full_input"
          onChange={(node) => commitSearch({ category: node.target.value })}
          required>
          <option value="all-categories">All Categories</option>
          <option value="appliances">Appliances</option>
          <option value="fashion">Clothing, Shoes &amp; Jewelry</option>
          <option value="books">Books</option>
          <option value="electronics">Electronics</option>
          <option value="tools">Tools &amp; Home Improvement</option>
        </select>
        <button className="search_button">search</button>
      </form>
    </div>
  );
};

SearchBar.propTypes = {
  commitSearch: React.PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    userCoords: [state.users.coords[0], state.users.coords[1]],
    userZip: state.users.zip,
  };
};

const mapDispatchToProps = (dispatch) => (
  {
    commitSearch: (query) => {
      dispatch(itemActions.searchItem(query));
    },
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
