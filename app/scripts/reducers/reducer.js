import { combineReducers } from 'redux';

const initUserState = {
  zip: null,
  coords: [37.4219999, -122.0840575],
  id: null,
  username: null,
  password: null,
  picReference: null,
};

const users = (state = initUserState, action) => {
  switch (action.type) {
    case 'LOGIN_VALID':
      return Object.assign({}, state, {
        zip: action.zip,
        id: action.id,
        username: action.username,
        picReference: action.picReference,
      });
    case 'ID_USER':
      return Object.assign({}, state, {
        username: action.username,
        password: action.password,
      });
    case 'LOGOUT_USER':
      return Object.assign({}, state, {
        username:null,
        password: null,
      })
    case 'SAVE_USER_ID':
      return Object.assign({}, state, {
        userID: action.userID,
      });
    case 'GET_USER_COORDS':
      // currently not being used. potentially for passing to map api?
      return Object.assign({}, state, {
        coords: [action.lat, action.lng],
      });
    case 'GET_USER_ZIP':
      return Object.assign({}, state, {
        zip: action.zip,
      });
    case 'LOGOUT_USER':
      return initUserState;
    case 'GET_USER_HISTORY':
      return Object.assign({}, state, {
        history: action.history,
      });
    default:
      return state;
  }
};

const initItemState = {
  items: [],
};

const items = (state = initItemState, action) => {
  switch (action.type) {
    case 'GET_INITIAL_ITEMS':
      return Object.assign({}, state, {
        items: action.items,
      });
    default:
      return state;
  }
};

const currentItem = (state = {}, action) => {
  switch (action.type) {
    case 'SET_NEW_ITEM':
        return action.item;
    default:
      return state;
  }
};

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

const initialUserListingsState = {
  active: [],
  pending: [],
  waiting: [],
}

const usersListings = (state = initialUserListingsState, action) => {
  switch (action.type) {
    case 'GET_USERS_LISTINGS':
      return Object.assign({}, state, {
        active: action.active,
        pending: action.pending,
        waiting: action.waiting,
      });
    default:
      return state;
  }
};

const initProfileView = {
  username: '',
  zipcode: '',
  rating: '',
  picReference: '',
  email: '',
};
const profileView = (state = initProfileView, action) => {
  switch (action.type) {
    case 'GET_PROFILE_VIEW':
      return Object.assign({}, state, {
        username: action.profile.username,
        zipcode: action.profile.zipcode,
        rating: action.profile.rating,
        picReference: action.profile.picReference,
        email: action.profile.email,
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
  data: [12,22,7,23,15],
  labels: ['Apples', 'Oranges', 'Pears', 'Peaches', 'Grapes'],
  label: 'shBoooooooooom',
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
}

const reducer = combineReducers({
  items,
  currentItem,
  users,
  search,
  usersListings,
  profileView,
  devChart,
  devMap,
  chartType,
});

module.exports = {
  reducer,
};
