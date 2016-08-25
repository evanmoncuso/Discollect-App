import _$ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import jsdom from 'jsdom';
import chai, { expect } from 'chai';
import chaiJquery from 'chai-jquery';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { reducer } from '../app/scripts/reducers/reducer';
import itemActions from '../app/scripts/actions/itemActions.js';
import userActions from '../app/scripts/actions/userActions.js';

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = global.document.defaultView;
global.navigator = global.window.navigator;
const $ = _$(window);

chaiJquery(chai, chai.util, $);

function renderComponent(ComponentClass, props = {}, state = {}) {
  const middleware = [thunk];
  const store = createStore(reducer, applyMiddleware(...middleware));
  store.dispatch(userActions.getUserInfo());
  store.dispatch(itemActions.elasticSearch({
  category: 'all-categories',
  keywords: '',
  coordinates: '0,0',
  distance: 10,
  startFrom: 0,
}));

  const componentInstance = TestUtils.renderIntoDocument(
    <Provider store={ store }>
      <ComponentClass {...props} />
    </Provider>
  );

  return $(ReactDOM.findDOMNode(componentInstance));
}

$.fn.simulate = function(eventName, value) {
  if (value) {
    this.val(value);
  }
  TestUtils.Simulate[eventName](this[0]);
};

export {renderComponent, expect};
