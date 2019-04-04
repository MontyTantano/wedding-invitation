import React, { useEffect } from 'react';
import throttle from 'lodash/throttle';
import { connect } from 'react-redux';

import Countdown from './Countdown';

import { changeScrollPositionBottom } from '../actions';

import * as texts from '../constants/texts';
import GreetingPhoto from '../components/GreetingPhoto';
import GreetingText from '../components/GreetingText';
import ContentWrapper from '../components/ContentWrapper';
import ContentText from '../components/ContentText';
import EventLocationMap from '../components/EventLocationMap';
import Palette from '../components/Palette';
import Contacts from '../components/Contacts';
import ConfirmationForm from './ConfirmationForm';
import FadeInWrapper from './FadeInWrapper';

import AppStyleIgnored from './App.scss';

const App = ({
  scrollPositionBottom,
  isAnonymous,
  invitationText,
  dispatch
}) => {
  const handleOnScroll = function handleOnScroll() {
    const val = window.pageYOffset + window.innerHeight;
    dispatch(changeScrollPositionBottom(val));
  };

  useEffect(() => {
    const handler = throttle(handleOnScroll, 250);
    handler();
    if (window && typeof window.addEventListener === 'function') {
      window.addEventListener('scroll', handler);
    }
    return () => {
      if (window && typeof window.removeEventListener === 'function') {
        window.removeEventListener('scroll', handler);
      }
    };
  });

  const baseTexts = (texts.BASE_TEXTS || []).map(text => (
    <ContentText text={text} key={text} />
  ));
  const eventText = (texts.EVENT_TEXT || []).map(text => (
    <ContentText text={text} key={text} />
  ));

  if (invitationText) {
    baseTexts.unshift(<ContentText text={invitationText} />);
  }

  return (
    <div className="wedding-app">
      <FadeInWrapper scrollPositionBottom={scrollPositionBottom}>
        <GreetingText texts={texts.GREETING_TEXTS} />
      </FadeInWrapper>
      <FadeInWrapper scrollPositionBottom={scrollPositionBottom}>
        <GreetingPhoto />
      </FadeInWrapper>
      <FadeInWrapper scrollPositionBottom={scrollPositionBottom}>
        <Countdown />
      </FadeInWrapper>
      <FadeInWrapper scrollPositionBottom={scrollPositionBottom}>
        <ContentWrapper title={texts.BASE_TEXT_TITLE}>
          {baseTexts}
        </ContentWrapper>
      </FadeInWrapper>
      <FadeInWrapper scrollPositionBottom={scrollPositionBottom}>
        <ContentWrapper title={texts.EVENT_LOCATION_TITLE}>
          {eventText}
        </ContentWrapper>
      </FadeInWrapper>
      <FadeInWrapper scrollPositionBottom={scrollPositionBottom}>
        <EventLocationMap />
      </FadeInWrapper>
      {!isAnonymous && (
        <FadeInWrapper scrollPositionBottom={scrollPositionBottom}>
          <ContentWrapper title={texts.CONFIRMATION_FORM_TITLE}>
            <ConfirmationForm />
          </ContentWrapper>
        </FadeInWrapper>
      )}
      <FadeInWrapper scrollPositionBottom={scrollPositionBottom}>
        <ContentWrapper title={texts.PALETTE_TITLE}>
          <ContentText text={texts.PALETTE_TEXT} />
          <Palette />
        </ContentWrapper>
      </FadeInWrapper>
      <FadeInWrapper scrollPositionBottom={scrollPositionBottom}>
        <ContentWrapper title={texts.WISH_FOR_GIFTS_TITLE}>
          <ContentText text={texts.WISH_FOR_GIFTS_TEXT} />
        </ContentWrapper>
      </FadeInWrapper>
      <FadeInWrapper scrollPositionBottom={scrollPositionBottom}>
        <ContentWrapper title={texts.CONTACTS_TITLE}>
          <ContentText text={texts.CONTACTS_TEXT} />
          <Contacts />
        </ContentWrapper>
      </FadeInWrapper>
    </div>
  );
};

function mapStateToProps(state) {
  const { isAnonymous, invitationText, scrollPositionBottom } = state;

  return {
    isAnonymous,
    invitationText,
    scrollPositionBottom
  };
}

export default connect(mapStateToProps)(App);
