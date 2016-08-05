const initState = {
  valid: false,
  username: null,
  password: null
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'LOGIN_VALID':
      console.log('123',action.valid)
      console.log('234',action.username)
      return Object.assign({}, state, {
        valid: action.valid,
        username: action.username,
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

module.exports = {
  reducer: reducer,
};
