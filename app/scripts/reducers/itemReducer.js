const initItemState = {
  items: [],
  current: {},
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
    default:
      return state;
  }
};

module.exports = items;
