const initUserState = {
  zip: null,
  coords: [37.4219999, -122.0840575],
  id: null,
  username: null,
  password: null,
  picReference: null,
  dev: false,
};

const users = (state = initUserState, action) => {
  switch (action.type) {
    case 'LOGIN_VALID':
      return Object.assign({}, state, {
        zip: action.zip,
        id: action.id,
        username: action.username,
        picReference: action.picReference,
        email: action.email,
      });
    case 'ID_USER':
      return Object.assign({}, state, {
        username: action.username,
        password: action.password,
      });
    case 'LOGOUT_USER':
      return Object.assign({}, state, {
        username: null,
        password: null,
      });
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
    case 'GET_USER_HISTORY':
      return Object.assign({}, state, {
        history: action.history,
      });
    case 'VALIDATE_DEV':
      return Object.assign({}, state, {
        dev: true,
      });
    default:
      return state;
  }
};

module.exports = users;
