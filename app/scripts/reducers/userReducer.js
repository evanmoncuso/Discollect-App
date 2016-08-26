const initUserState = {
  zip: null,
  coords: [37.4219999, -122.0840575],
  id: null,
  username: null,
  password: null,
  picReference: null,
  avgRating: 0,
  dev: {},
};

const initProfileView = {
  username: '',
  zipcode: '',
  rating: '',
  picReference: '',
  email: '',

};


const users = (state = initUserState, action) => {
  switch (action.type) {
    case 'LOGIN_VALID':
      return Object.assign({}, state, {
        zip: action.zipcode,
        id: action.id,
        username: action.username,
        picReference: action.picReference,
        email: action.email,
        avgRating: action.avgRating,
      });
    case 'ID_USER':
      return Object.assign({}, state, {
        username: action.username,
        password: action.password,
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
    case 'DEV_VALIDATE':
      return Object.assign({}, state, {
        dev: {
          valid: action.valid,
          reqLimit: action.reqLimit,
          requests: action.requests,
        },
      });
    case 'DEV_CREATE':
      return Object.assign({}, state, {
        dev: {
          valid: action.valid,
          reqLimit: action.reqLimit,
          requests: action.requests,
          key: action.key,
        },
      });
    // case 'GET_PROFILE_VIEW':
    //   return Object.assign({}, state, {
    //     username: action.profile.username,
    //     zipcode: action.profile.zipcode,
    //     rating: action.profile.rating,
    //     picReference: action.profile.picReference,
    //     email: action.profile.email,
    //   });
    case 'LOGOUT_USER':
      return initUserState;
    default:
      return state;
  }
};

module.exports = users;
