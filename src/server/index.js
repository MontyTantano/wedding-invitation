import React from 'react';
import Express from 'express';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import configureStore from '../configureStore';
import App from '../containers/App';
import renderFullPage from './renderFullPage';

const PORT = process.env.PORT || 5000;
const app = Express();

function handleRender(req, res) {
  const store = configureStore();
  const html = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const preloadedState = store.getState();

  res.send(renderFullPage(html, preloadedState));
}

app
  .use('/dist', Express.static('dist'))
  .use('/assets', Express.static('assets'))
  .get('/', handleRender)
  .listen(PORT);
