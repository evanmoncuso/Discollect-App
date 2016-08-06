import { combineReducers } from 'redux';

const initUserState = {
  valid: false,
  zip: null,
  username: null,
  password: null,
};

const users = (state = initUserState, action) => {
  switch (action.type) {
    case 'LOGIN_VALID':
      return Object.assign({}, state, {
        valid: action.valid,
        zip: action.zip,
      });
    case 'ID_USER':
      return Object.assign({}, state, {
        username: action.username,
        password: action.password,
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

const reducer = combineReducers({
  items,
  users,
});

module.exports = {
  reducer,
};
