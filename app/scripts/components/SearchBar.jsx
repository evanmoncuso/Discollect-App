import React from 'react';
import { connect } from 'react-redux';
import Autosuggest from 'react-autosuggest';
import fetch from 'isomorphic-fetch';
import GoogMap from './GoogMap.jsx';
import itemActions from '../actions/itemActions.js';


function getSuggestionValue(suggestion) {
  return suggestion._source.title;
}

function renderSuggestion(suggestion) {
  return (
    <span className="suggestion_span">{suggestion._source.title}</span>
  );
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalState: false,
      latLng: '0,0',
      radius: 10,
      value: '',
      suggestions: [],
    };
    this.changeCoords = this.changeCoords.bind(this);
    this.handleSlide = this.handleSlide.bind(this);
    this.getPage = this.getPage.bind(this);
  }
  componentDidMount() {
    const context = this;
    setTimeout(() => {
      context.setState({
        modalState: false,
        suggestions: [],
      });
    }, 400);
  }

  getSuggestions(value) {
    var context = this;
    var url = 'https://mysterious-coast-57298.herokuapp.com/listings/titlesearch?title='+value;
    fetch(url)
    .then(res=> res.json())
    .then(data=>{
      console.log(data);
      context.setState({
        suggestions : data
      });
    })
  }

  suggestChange(event, { newValue }) {
    this.setState({
      value: newValue
    });
    console.log(newValue);
  };

  onSuggestionsUpdateRequested({ value }) {
    var context = this;
    context.getSuggestions(value);
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
  getPage(searchHitNum) {
    console.log('>', searchHitNum);
    const nextQuery = this.props.lastQuery;
    nextQuery.startFrom = searchHitNum;
    this.props.doElasticSearch(nextQuery);
  }

  render() {
    let { userZip } = this.props;
    let keywords;
    let zip;
    let category;
    let { value, suggestions } = this.state;
    let inputProps = {
      value,
      onChange: this.suggestChange.bind(this),
    };
    return (
      <div className="search_bar_container">
        <div className="search_bar">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const data = {
                category: category.value,
                keywords: this.state.value,
                coordinates: this.state.latLng,
                distance: this.state.radius,
                startFrom: 0,
              };
              this.props.doElasticSearch(data);
              category.value = 'all-categories';
              keywords.value = '';
            }}
          >
            <div className="autosuggest_holder">
              <div
                className="map_button"
                onClick={() => { this.toggleModal(); }}
              >
                <img src="location_white.png" alt="choose a location" />
              </div>
              <Autosuggest
                className="autosuggest"
                suggestions={suggestions}
                onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested.bind(this)}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
                shouldRenderSuggestions={function shouldRenderSuggestions(value) {
                  return value.trim().length > 2;
                }}
              />
              <button className="search_button">search</button>
            </div>
          </form>
          <div className="pagination">
            {
              this.props.searchHits.map((searchHitNum, i) => (
                <a
                  onClick={() => {
                    this.getPage(searchHitNum);
                  }}
                  className="page_number"
                  key={i} >
                {i + 1}
                </a>
              ))
            }
          </div>
          {
            this.state.modalState ?
            (<div className='map_modal modal_on' onClick={() => { this.toggleModal(); }}>
              <div className="map_modal_content">
                <GoogMap changeCoords={this.changeCoords} />
                <input type="range" name="miles" min="0" max="100" onChange={(e) => { this.handleSlide(e); }} />
                <span>{this.state.radius}</span>
              </div>
            </div>)
            : ''
          }
        </div>
      </div>
    );
  }
}

SearchBar.propTypes = {
  commitSearch: React.PropTypes.func,
  searchHits: React.PropTypes.array,
  lastQuery: React.PropTypes.object,
  doElasticSearch: React.PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    userZip: state.users.zip,
    searchHits: state.searchHits,
    lastQuery: state.lastQuery,
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
