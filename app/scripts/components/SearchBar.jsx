import React from 'react';
import { connect } from 'react-redux';

import itemActions from '../actions/itemActions.js';


const SearchBar = ({ commitSearch }) => {
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
            zip: zip.value,
          };
          commitSearch(data);
          category.value = 'all-categories';
          keywords.value = '';
          zip.value = '';
        }}
      >
        <input
          className="search_bar_input keywords"
          ref={(node) => { keywords = node; }}
          placeholder="keywords"
        />
        <input
          className="search_bar_input zip"
          ref={(node) => { zip = node; }}
          placeholder="zip"
        />
        <select ref={(node) => { category = node; }} id="category" required>
          <option value="all-categories">All Categories</option>
          <option value="appliances">Appliances</option>
          <option value="fashion">Clothing, Shoes &amp; Jewelry</option>
          <option value="books">Books</option>
          <option value="electronics">Electronics</option>
          <option value="tools">Tools &amp; Home Improvement</option>
        </select>
        <button>search</button>
      </form>
    </div>
  );
};

SearchBar.propTypes = {
  commitSearch: React.PropTypes.func,
};

const mapDispatchToProps = (dispatch) => (
  {
    commitSearch: (query) => {
      dispatch(itemActions.searchItem(query));
    },
  }
);

export default connect(null, mapDispatchToProps)(SearchBar);