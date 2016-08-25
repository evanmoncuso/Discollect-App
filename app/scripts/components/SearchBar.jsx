import React from 'react';
import { connect } from 'react-redux';
import Autosuggest from 'react-autosuggest';
import fetch from 'isomorphic-fetch';
import GoogMap from './GoogMap.jsx';
import itemActions from '../actions/itemActions.js';



function getSuggestionValue(suggestion) { // when suggestion is selected, this function tells
  return suggestion._source.title;                 // what should be the value of the input
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
      currentPage: 0,
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
      context.setState({
        suggestions : data
      });
    })
  }

  suggestChange(event, { newValue }) {
    this.setState({
      value: newValue
    });
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
    let keywords, category;
    let zip;
    let { value, suggestions } = this.state;
    let inputProps = {
      value,
      onChange: this.suggestChange.bind(this),
    };
    let theme = {
      suggestionsContainer:{
        margin: '0px, 10px, 0px, 10px',
        display: 'block',
        position: 'absolute',
        top: '150px',
        width: '280px',
        border: '1px solid #aaa',
        backgroundColor: '#fff',
        fontFamily: 'Helvetica',
        fontWeight: '300',
        fontSize: '16px',
        borderBottomLeftRadius: '4px',
        borderBottomRightRadius: '4px',
        zIndex: '100',
      }
    };
    return (
    <div className='search_bar_container'>
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
            
            console.log(data);
            this.props.doElasticSearch(data);
            category.value = 'all-categories';
            this.state.value = '';
          }}
        >
          <div className="full_input">
            <label htmlFor="keywords">keyword: </label>
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested.bind(this)}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              inputProps={inputProps} 
              shouldRenderSuggestions = {function shouldRenderSuggestions(value) {
                return value.trim().length > 2;}
              }
              theme={theme}
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
            // onChange={(node) => this.props.commitSearch({ category: node.target.value })}
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
        {
            this.state.modalState ?
            (<div className='map_modal modal_on'>
              <div className="map_modal_content">
                <GoogMap changeCoords={this.changeCoords} />
                <input type="range" name="miles" min="0" max="100" onChange={(e) => { this.handleSlide(e); }} />
                <span>{this.state.radius}</span>
              </div>
            </div>)
            : ''
          }
          <div className="pagination">
            {
              this.props.searchHits.map((searchHitNum, i) => (
                <a
                  className={this.state.currentPage === i ? 'page_number current' : 'page_number'}
                  onClick={() => {
                    this.setState({
                      currentPage: i,
                    });
                    this.getPage(searchHitNum);
                  }}
                  key={i}
                >{i + 1}</a>
              ))
            }
        </div>
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
