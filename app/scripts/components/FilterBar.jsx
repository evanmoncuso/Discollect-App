import React from 'react';
import { connect } from 'react-redux';
// import searchFilter from '../searchFilter';

const FilterBar = (props) => {
  return (
    <div className="filterBar">
      <form>
        <fieldset>
          <legend>Condition:</legend>
          <label htmlFor="new">New</label><input id="new" type="checkbox" /><br />
          <label htmlFor="exc">Excellent</label><input id="exc" type="checkbox" /><br />
          <label htmlFor="good">Good</label><input id="good" type="checkbox" /><br />
          <label htmlFor="fair">Fair</label><input id="fair" type="checkbox" /><br />
          <label htmlFor="salv">Salvage</label><input id="salv" type="checkbox" /><br />
        </fieldset>
        <br />
        <fieldset>
          <legend>Categories:</legend>
          <input type="text" />
        </fieldset>
        <br />
        <fieldset>
          <legend>Keyword:</legend>
          <input type="text" />
        </fieldset>
        <br />
        <fieldset>
          <legend>Location:</legend>
          <label htmlFor="zip">Zip Code</label>
          <input type="text" /><br />
          <label htmlFor="state">State</label>
          <input type="text" /><br />
          <input type="range" />
        </fieldset>
        <br />
        <fieldset>
          <legend>Created At:</legend>
          <input type="date" />
        </fieldset>
        <br />
        <fieldset>
          <legend>Search Description:</legend>
          <input type="text" />
        </fieldset>
        <br />
        <fieldset>
          <legend>Giver Rating:</legend>
          <input type="range" />
        </fieldset>
        <button type="submit">Filter</button>
      </form>
    </div>
  );
};

FilterBar.propTypes = {
  // dispatchLogin: React.PropTypes.func,
};

const mapDispatchToProps = (dispatch) => (
  {
    // dispatchLogin: (user, pass) => {
    //   dispatch(checkUserLogin(user, pass));
    // },
  }
);

export default connect(null, null)(FilterBar);