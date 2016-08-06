import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';

// --- redux additions --- //
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { reducer } from './reducers/reducer';

import Routes from './components/Routes.jsx';
import itemActions from './actions/itemActions.js';

const middleware = [thunk, logger()];

const store = createStore(reducer, applyMiddleware(...middleware));

store.dispatch(itemActions.populateInitialListings());

const ProvidedApp = () => (
  <Provider store={store}>
    <Router history={browserHistory} routes={Routes} />
  </Provider>
);

ReactDOM.render(<ProvidedApp />, document.getElementById('main'));
