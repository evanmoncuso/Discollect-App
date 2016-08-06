import React from 'react';
import { connect } from 'react-redux';

import itemActions from '../actions/itemActions.js';


const SearchBar = ({ commitSearch }) => {
  let search;
  return (
    <div className="search_bar">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          commitSearch(search.value);
          search.value = '';
        }}
      >
        <input className="search_bar_input" ref={(node) => { search = node; }} />
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
