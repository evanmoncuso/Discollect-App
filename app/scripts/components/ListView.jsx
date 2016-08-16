import React from 'react';
import { connect } from 'react-redux';
import ListEntry from './ListEntry.jsx';
import itemActions from '../actions/itemActions.js';
import { browserHistory } from 'react-router';

import searchFilter from '../actions/searchFilter.js';

let ListView = ({ dispatchGetItems, items, users, dispatchIndivItem }) => {
  return (
    <div className="main_container listings_container">
      {items.map((item, i) => {
        return <ListEntry key={i} entry={item} action={dispatchIndivItem} />
      })}

    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    items: searchFilter(state.items.items, state.search.keywords, state.search.zip, state.search.category),
    users: state.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchGetItems: () => {
      dispatch(itemActions.populateInitialListings());
    },
    dispatchIndivItem: (id) => {
      dispatch(itemActions.getIndividualListing(id));
    }
  };
};

ListView = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListView);

export default ListView;
