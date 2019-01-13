import '@babel/polyfill';

import React from 'react';
import { hydrate } from 'react-dom';
import Root from './containers/Root';

const NODE_ENV = process && process.env && process.env.NODE_ENV;

const renderRoot = () => hydrate(<Root />, document.getElementById('root'));
renderRoot();

if (NODE_ENV !== 'production' && module.hot) {
  renderRoot();
}

export default Root;
