const initialUserListingsState = {
  active: [],
  pending: [],
  waiting: [],
};

const initItemState = {
  items: [],
  current: {},
  userListings: initialUserListingsState,
};

const items = (state = initItemState, action) => {
  switch (action.type) {
    case 'GET_INITIAL_ITEMS':
      return Object.assign({}, state, {
        items: action.items,
      });
    case 'SET_CURR_ITEM':
      return Object.assign({}, state, {
        current: action.current,
      });
    case 'GET_USERS_LISTINGS':
      return Object.assign({}, state, {
        userListings: {
          active: action.active,
          pending: action.pending,
          waiting: action.waiting,
        },
      });
    case 'LOGOUT_USER':
      return Object.assign({}, state, {
        userListings: initialUserListingsState,
      });
    default:
      return state;
  }
};

module.exports = items;
