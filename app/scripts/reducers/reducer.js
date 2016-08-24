import { combineReducers } from 'redux';

import users from './userReducer.js';
import items from './itemReducer.js';

const search = (state = {}, action) => {
  switch (action.type) {
    case 'SUBMIT_SEARCH':
      return Object.assign({}, state, {
        keywords: action.keywords,
        category: action.category,
        zip: action.zip,
      });
    case 'UPDATE_SEARCH_PARAMS':
      return Object.assign({}, state, {
        keywords: action.keywords || null,
        category: action.category || null,
        zip: action.zip || null,
      });
    default:
      return state;
  }
};

const initMapData = {
    AL:0,AK:0,AZ:0,AR:0,CA:0,CO:0,CT:0,DE:0,FL:0,GA:0,
    HI:0,ID:0,IL:0,IN:0,IA:0,KS:0,KY:0,LA:0,ME:0,MD:0,
    MA:0,MI:0,MN:0,MS:0,MO:0,MT:0,NE:0,NV:0,NH:0,NJ:0,
    NM:0,NY:0,NC:0,ND:0,OH:0,OK:0,OR:0,PA:0,RI:0,SC:0,
    SD:0,TN:0,TX:0,UT:0,VT:0,VA:0,WA:0,WV:0,WI:0,WY:0
};

const devMap = (state = initMapData, action) => {
  switch (action.type) {
    case 'GET_MAP':
  return Object.assign({}, state, action.areas);
    default:
    return state;
  }
};

const initChartType = {
  type: 'bar',
}

const chartType = (state = initChartType, action) => {
  switch (action.type) {
    case 'GET_CHART_TYPE':
      return Object.assign({}, state, {
        type: action.chartType
      })
    default:
      return state;
  }
}

const initChartData = {
  data: [],
  labels: [],
  label: 'Welcome to Discollect Data Centre',
};

const devChart = (state = initChartData, action) => {
  switch (action.type) {
    case 'GET_CHART':
      return Object.assign({}, state, {
        data: action.data,
        labels: action.labels,
        label: action.label,
      });
    default:
      return state;
  }
};

// const initSearchHits = 0;
const searchHits = (state = [], action) => {
  switch (action.type) {
    case 'SET_SEARCH_HITS':
      let firstIndices = [];
      for (let i = 0; i < action.payload; i += 9) {
        firstIndices.push(i);
      }
      return firstIndices;
    default:
      return state;
  }
};

const lastQuery = (state = {}, action) => {
  switch (action.type) {
    case 'SAVE_LAST_QUERY':
      return action.payload;
    default:
      return state;
  }
};

const reducer = combineReducers({
  items,
  users,
  search,
  devChart,
  devMap,
  chartType,
  searchHits,
  lastQuery,
});

module.exports = {
  reducer,
};
