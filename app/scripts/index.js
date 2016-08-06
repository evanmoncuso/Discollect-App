import React from 'react';
import ReactDOM from 'react-dom';

// --- redux additions --- //
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { reducer } from './reducers/reducer';

import App from './components/App.jsx';
import itemActions from './actions/itemActions.js';

const middleware = [thunk, logger()];

const store = createStore(reducer, applyMiddleware(...middleware));

store.dispatch(itemActions.populateInitialListings());

const ProvidedApp = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

ReactDOM.render(<ProvidedApp />, document.getElementById('main'));
