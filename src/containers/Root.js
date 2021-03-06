/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../configureStore';
import App from './App';

const preloadedState = window && window.__PRELOADED_STATE__;

if (window) {
  delete window.__PRELOADED_STATE__;
}

const store = configureStore(preloadedState);

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Root;
