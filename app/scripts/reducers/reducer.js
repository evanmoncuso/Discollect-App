import { combineReducers } from 'redux';

const initUserState = {
  zip: null,
  coords: [],
  id: null,
  username: null,
  password: null,
};

const users = (state = initUserState, action) => {
  switch (action.type) {
    case 'LOGIN_VALID':
      return Object.assign({}, state, {
        zip: action.zip,
        id: action.id,
        username: action.username,
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

const search = (state = {}, action) => {
  switch (action.type) {
    case 'SUBMIT_SEARCH':
      return Object.assign({}, state, {
        keywords: action.keywords,
        category: action.category,
        zip: action.zip,
      });
    default:
      return state;
  }
};


const initUploadState = {
  data_uri: null,
  filename: null,
  filetype: null,
};

const upload = (state = {}, action) => {
  switch (action.type) {
    case 'ON_UPLOAD':
    return Object.assign({}, state, {
      data_uri: action.data_uri,
      filename: action.filename,
      filetype: action.filetype,
    });
    default: return state;
  }
};

// const initUserListingsState = {
//   userListings: [],
// };

// const userListings = (state = initUserListingsState, action) => {
//   switch (action.type) {
//     case 'GET_USERS_LISTINGS':
//       return Object.assign({}, state, {
//         userListings: action.userListings,
//       });
//     default:
//       return state;
//   }
// };

const usersListings = (state = [], action) => {
  switch (action.type) {
    case 'GET_USERS_LISTINGS':
      // console.log('~~~',action.userListings);
      return action.usersListings;
    default:
      return state;
  }
};

const reducer = combineReducers({
  items,
  users,
  search,
  usersListings,
  upload,
});

module.exports = {
  reducer,
};
