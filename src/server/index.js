import React from 'react';
import express from 'express';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import nodeMailer from 'nodemailer';

import configureStore from '../configureStore';
import App from '../containers/App';
import Constants from '../constants/texts';
import { calculateCountdown } from '../utils';

import template from './template';
import mailTemplate from './mailTemplate';

const PORT = process.env.PORT || 5000;
const app = express();

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
  const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'makushev.o.k@gmail.com',
      pass: '3Obkpobu40236'
    }
  });
  const mailOptions = {
    from: '"Makushev Oleg" <makushev.o.k@gmail.com>',
    to: 'makushev.o.k@yandex.ru',
    subject: 'Wedding Invitation Response',
    text: mailTemplate(form)
  };
  transporter.sendMail(mailOptions, error => {
    if (error) {
      res.status(400).send({ success: false });
    } else {
      res.status(200).send({ success: true });
    }
  });
  res.send(req.body);
}

app
  .use('/dist', express.static('dist'))
  .use('/assets', express.static('assets'))
  .use(express.json())
  .get('/', handleRender)
  .post('/form', handleFormPost)
  .listen(PORT);
