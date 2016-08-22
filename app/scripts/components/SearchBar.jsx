import React from 'react';
import { connect } from 'react-redux';
import GoogMap from './GoogMap.jsx';
import itemActions from '../actions/itemActions.js';


class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalState: false,
      latLng: '0,0',
      radius: 10,
    };
    this.changeCoords = this.changeCoords.bind(this);
    this.handleSlide = this.handleSlide.bind(this);
  }
  componentDidMount() {
    const context = this;
    // setTimeout(() => {
    //   context.setState({
    //     modalState: false,
    //   });
    // }, 400);
  }
  toggleModal() {
    this.setState({
      modalState: !this.state.modalState,
    });
  }
  changeCoords(latitude, longitude) {
    this.setState({
      latLng: `${latitude},${longitude}`,
    });
  }
  handleSlide(e) {
    this.setState({
      radius: e.target.value,
    });
    console.log(this.state.radius);
  }
  render() {
    let { userZip } = this.props;
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
              coordinates: this.state.latLng,
              distance: this.state.radius,
            };
            console.log(data);
            this.props.doElasticSearch(data);
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
              onChange={(node) => this.props.commitSearch({ keywords: node.target.value.toLowerCase() })}
            />
          </div>
          <div className="map_button" onClick={() => { this.toggleModal(); }}>
            <span>Location</span>
            <img src="pin(1).png" />
          </div>
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
          <button className="search_button">search</button>
        </form>
        <div className={this.state.modalState ? 'map_modal modal_on' : 'map_modal modal_off'}>
          <div className="map_modal_content">
            <GoogMap changeCoords={this.changeCoords} />
            <input type="range" name="miles" min="0" max="100" onChange={(e) => { this.handleSlide(e); }} />
            <span>{this.state.radius}</span>
          </div>

        </div>
      </div>
    );
  }
}

SearchBar.propTypes = {
  commitSearch: React.PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    // userCoords: [state.users.coords[0], state.users.coords[1]],
    userZip: state.users.zip,
  };
};

const mapDispatchToProps = (dispatch) => (
  {
    commitSearch: (query) => {
      dispatch(itemActions.searchItem(query));
    },
    doElasticSearch: (query) => {
      dispatch(itemActions.elasticSearch(query));
    },
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
