import React from 'react';
import Express from 'express';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import App from './containers/App';
import packageJson from '../package.json';

const VERSION = (packageJson.version || '').replace(/\./g, '-');
const app = Express();
const PORT = process.env.PORT || 5000;

function renderFullPage(html, preloadedState) {
  // WARNING: See the following for security issues around embedding JSON in HTML:
  // http://redux.js.org/recipes/ServerRendering.html#security-considerations
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>Wedding Invitation</title>
      </head>
      <body>
        <section id="root">${html}</section>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
            /</g,
            '\\u003c'
          )}
        </script>
        <script src="/dist/app.${VERSION}.js"></script>
      </body>
    </html>
    `;
}

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
  .get('/', handleRender)
  .listen(PORT);
