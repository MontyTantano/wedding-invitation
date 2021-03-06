import '@babel/polyfill';

import React from 'react';
import { hydrate } from 'react-dom';
import Root from './containers/Root';
import rootStyleIgnored from './index.scss';

const NODE_ENV = process && process.env && process.env.NODE_ENV;

const renderRoot = () => hydrate(<Root />, document.getElementById('root'));
renderRoot();

if (NODE_ENV !== 'production' && module.hot) {
  renderRoot();
}

export default Root;
