import React from 'react';
import ReactDOM from 'react-dom';

// --- redux additions --- //
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

const middleware = [thunk, logger()];

import { reducer } from './reducers/reducer';

const store = createStore(reducer, applyMiddleware(...middleware));

import App from './components/App.jsx';

const ProvidedApp = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

ReactDOM.render(<ProvidedApp />, document.getElementById('main'));
