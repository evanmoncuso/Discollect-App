import React from 'react';
import { connect } from 'react-redux';

const FilterBar = (props) => {
  return (
    <div className="filterBar">
      <form>
        <fieldset className="condition_container">
          <legend>Condition:</legend>
            <div className="labelled_checkbox">
              <label htmlFor="new">New</label>
              <input id="new" type="checkbox" />
            </div>
            <div className="labelled_checkbox">
              <label htmlFor="exc">Excellent</label>
              <input id="exc" type="checkbox" />
              </div>
            <div className="labelled_checkbox">
              <label htmlFor="good">Good</label>
              <input id="good" type="checkbox" />
            </div>
            <div className="labelled_checkbox">
              <label htmlFor="fair">Fair</label>
              <input id="fair" type="checkbox" />
            </div>
            <div className="labelled_checkbox">
              <label htmlFor="salv">Salvage</label>
              <input id="salv" type="checkbox" />
            </div>
        </fieldset>

        <fieldset>
          <legend>Categories:</legend>
          <input type="text" />
        </fieldset>
        <fieldset>
          <legend>Keyword:</legend>
          <input type="text" />
        </fieldset>
        <fieldset>
          <legend>Location:</legend>
          <div className="filter_location">
            <label htmlFor="zip">Zip Code</label>
            <input type="text" />
          </div>
          <div className="filter_location">
            <label htmlFor="state">State</label>
            <input type="text" />
          </div>
          <input type="range" />
        </fieldset>
        <fieldset>
          <legend>Posting Date:</legend>
          <input className="date_range" type="date" />
        </fieldset>
        <fieldset>
          <legend>Description:</legend>
          <input type="text" />
        </fieldset>
        <fieldset>
          <legend>Giver Rating:</legend>
          <input type="range" />
        </fieldset>
        <div className="button_container">
          <button type="submit" className="blue_button">Filter</button>
        </div>
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
