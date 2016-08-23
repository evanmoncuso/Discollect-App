import React from 'react';
import { connect } from 'react-redux';
import itemActions from '../actions/itemActions.js';

import searchFilter from '../actions/searchFilter.js';

let Sidebar = ({ dispatchGetItems, items, users, dispatchIndivItem }) => {
  let category;
  return (
    <aside className="listing_filters">
      <select
        ref={(node) => { category = node; }}
        id="category"
        className="search_bar_input full_input"
        onChange={(node) => this.props.commitSearch({ category: node.target.value })}
        required>
        <option value="all-categories">All Categories</option>
        <option value="appliances">Appliances</option>
        <option value="fashion">Clothing, Shoes &amp; Jewelry</option>
        <option value="books">Books</option>
        <option value="electronics">Electronics</option>
        <option value="tools">Tools &amp; Home Improvement</option>
      </select>
      <div className="map_button" onClick={() => { this.toggleModal(); }}>
        <span>Location</span>
        <img src="pin(1).png" />
      </div>
    </aside>
  );
};

const mapStateToProps = (state) => (
  {

  }
);

const mapDispatchToProps = (dispatch) => (
  {
    commitSearch: (query) => {
      dispatch(itemActions.searchItem(query));
    },
  }
)

Sidebar = connect(mapStateToProps, mapDispatchToProps)(Sidebar);

export default Sidebar;
