import React from 'react';
import express from 'express';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import sendgrid from 'sendgrid';

import configureStore from '../configureStore';
import App from '../containers/App';
import * as texts from '../constants/texts';
import { calculateCountdown } from '../utils';

import template from './indexTemplate';
import mailTemplate from './mailTemplate';
import { getGuestsStore } from './guests-dictionary';

const PORT = process.env.PORT || 5000;
const app = express();
const sgClient = sendgrid(process.env.SENDGRID_API_KEY);
const initiaStore = {
  countdown: calculateCountdown(texts.EVENT_DATE)
};

function getInitiaStore({ guests }) {
  const guestsStore = getGuestsStore(guests);
  return {
    isAnonymous: !guestsStore,
    ...initiaStore,
    ...guestsStore
  };
}

function handleRender(req, res) {
  const { guests } = req.query;
  const store = configureStore(
    getInitiaStore({
      guests
    })
  );
  const html = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const preloadedState = store.getState();

  res.send(template(html, preloadedState));
}

function sendEmail(subject, value) {
  const sgEmptyRequest = sgClient.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: {
      personalizations: [
        {
          to: [
            {
              email: 'makushev.o.k@yandex.ru'
            },
            {
              email: 'tanaka.danilova@gmail.com'
            }
          ],
          subject
        }
      ],
      from: {
        email: 'makushev.o.k@gmail.com'
      },
      content: [
        {
          type: 'text/plain',
          value
        }
      ]
    }
  });
  return sgClient.API(sgEmptyRequest);
}

function handleCancelFormPost(req, res) {
  const form = req.body;
  sendEmail(
    `Свадьба. Не пойдем - ${form.fio}`,
    `(Не пойдем) ${mailTemplate(form)}`
  )
    .then(() => res.status(200).send({ success: true }))
    .catch(() => res.status(400).send({ success: false }));
}

function handleFormPost(req, res) {
  const form = req.body;
  sendEmail(`Свадьба. Подтверждение от ${form.fio}`, mailTemplate(form))
    .then(() => res.status(200).send({ success: true }))
    .catch(() => res.status(400).send({ success: false }));
}

app
  .use('/dist', express.static('dist'))
  .use('/assets', express.static('assets'))
  .use(express.json())
  .get('/', handleRender)
  .post('/form', handleFormPost)
  .post('/form-cancel', handleCancelFormPost)
  .listen(PORT);
