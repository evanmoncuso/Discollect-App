import { combineReducers } from 'redux';

const initUserState = {
  zip: null,
  coords: [],
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
        coords: [action.lng, action.lat],
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

const reducer = combineReducers({
  items,
  currentItem,
  users,
  search,
  usersListings,
  profileView,
});

module.exports = {
  reducer,
};
