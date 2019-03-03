import React from 'react';
import { connect } from 'react-redux';

import Countdown from './Countdown';

import Constants from '../constants/texts';
import GreetingPhoto from '../components/GreetingPhoto';
import GreetingText from '../components/GreetingText';
import ContentWrapper from '../components/ContentWrapper';
import ContentText from '../components/ContentText';
import EventLocationMap from '../components/EventLocationMap';
import ConfirmationForm from './ConfirmationForm';

import AppStyleIgnored from './App.scss';

const App = () => (
  <div className="wedding-app">
    <GreetingText texts={Constants.GREETING_TEXTS} />
    <GreetingPhoto />
    <Countdown />
    <ContentWrapper title={Constants.BASE_TEXT_TITLE}>
      <ContentText text={Constants.BASE_TEXT_DATE} />
      <ContentText text={Constants.BASE_TEXT_ADDRESS} />
    </ContentWrapper>
    <ContentWrapper title={Constants.EVENT_LOCATION_TITLE}>
      <EventLocationMap />
    </ContentWrapper>
    <ContentWrapper title={Constants.CONFIRMATION_FORM_TITLE}>
      <ConfirmationForm />
    </ContentWrapper>
  </div>
);

function mapStateToProps(state) {
  const { isFormSended } = state;

  return {
    isFormSended
  };
}

export default connect(mapStateToProps)(App);
