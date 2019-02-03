import React, { Component } from 'react';
import { connect } from 'react-redux';

import Constants from '../constants';

import GreetingPhoto from '../components/GreetingPhoto';
import GreetingText from '../components/GreetingText';
import ContentWrapper from '../components/ContentWrapper';
import ContentText from '../components/ContentText';
import EventLocationMap from '../components/EventLocationMap';
import Countdown from '../components/Countdown';

import AppStyleIgnored from './App.scss';

class App extends Component {
  render() {
    return (
      <div className="wedding-app">
        <GreetingText texts={Constants.GREETING_TEXTS} />
        <GreetingPhoto />
        <Countdown date={Constants.EVENT_DATE} />
        <ContentWrapper>
          <ContentText text={Constants.BASE_TEXT_DATE} />
          <ContentText text={Constants.BASE_TEXT_ADDRESS} />
        </ContentWrapper>
        <ContentWrapper>
          <EventLocationMap />
        </ContentWrapper>
      </div>
    );
  }
}

export default connect()(App);
