import React from 'react';
import express from 'express';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import sendgrid from 'sendgrid';

import configureStore from '../configureStore';
import App from '../containers/App';
import Constants from '../constants/texts';
import { calculateCountdown } from '../utils';

import template from './template';
import mailTemplate from './mailTemplate';

const PORT = process.env.PORT || 5000;
const app = express();
const sgClient = sendgrid(process.env.SENDGRID_API_KEY);

function handleRender(req, res) {
  const countdown = calculateCountdown(Constants.EVENT_DATE);
  const store = configureStore({
    ...(countdown
      ? {
          countdown
        }
      : {})
  });
  const html = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const preloadedState = store.getState();

  res.send(template(html, preloadedState));
}

function handleFormPost(req, res) {
  const form = req.body;
  const sgEmptyRequest = sgClient.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: {
      personalizations: [
        {
          to: [
            {
              email: 'makushev.o.k@yandex.ru'
            }
          ],
          subject: 'Wedding Invitation Responce'
        }
      ],
      from: {
        email: 'makushev.o.k@gmail.com'
      },
      content: [
        {
          type: 'text/plain',
          value: mailTemplate(form)
        }
      ]
    }
  });
  sgClient
    .API(sgEmptyRequest)
    .then(() => res.status(200).send({ success: true }))
    .catch(() => res.status(400).send({ success: false }));
}

app
  .use('/dist', express.static('dist'))
  .use('/assets', express.static('assets'))
  .use(express.json())
  .get('/', handleRender)
  .post('/form', handleFormPost)
  .listen(PORT);
