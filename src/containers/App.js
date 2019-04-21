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
import PaletteComment from '../components/PaletteComment';
import Contacts from '../components/Contacts';
import BackgroundImg from '../components/BackgroundImg';
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
      <BackgroundImg url="assets/img/branch_to_right_down.png" place="first" />
      <BackgroundImg url="assets/img/divorce-first.png" place="fourth" />
      <FadeInWrapper scrollPositionBottom={scrollPositionBottom}>
        <GreetingText url={texts.TITLE_MAIN_IMG_URL} />
      </FadeInWrapper>
      <FadeInWrapper scrollPositionBottom={scrollPositionBottom}>
        <BackgroundImg url="assets/img/divorce-second.jpg" place="fifth" />
        <GreetingPhoto />
      </FadeInWrapper>
      <FadeInWrapper scrollPositionBottom={scrollPositionBottom}>
        <Countdown />
      </FadeInWrapper>
      <FadeInWrapper scrollPositionBottom={scrollPositionBottom}>
        <ContentWrapper
          title={texts.BASE_TEXT_TITLE}
          url={texts.TITLE_INVITATION_IMG_URL}
        >
          {baseTexts}
        </ContentWrapper>
      </FadeInWrapper>
      <BackgroundImg
        url="assets/img/divorce-third.png"
        place="sixth"
        orientation="right"
      />
      <BackgroundImg
        url="assets/img/branch_to_left_up.png"
        place="second"
        orientation="right"
      />

      <div className="wedding-app-location" />
      <FadeInWrapper scrollPositionBottom={scrollPositionBottom}>
        <ContentWrapper
          title={texts.EVENT_LOCATION_TITLE}
          url={texts.TITLE_LOCATION_IMG_URL}
        >
          {eventText}
        </ContentWrapper>
      </FadeInWrapper>
      <FadeInWrapper scrollPositionBottom={scrollPositionBottom}>
        <EventLocationMap />
      </FadeInWrapper>
      {!isAnonymous && (
        <React.Fragment>
          <BackgroundImg
            url="assets/img/branch_to_right_smal.png"
            place="third"
          />
          <BackgroundImg url="assets/img/divorce-second.jpg" place="seventh" />
          <FadeInWrapper scrollPositionBottom={scrollPositionBottom}>
            <ContentWrapper
              title={texts.CONFIRMATION_FORM_TITLE}
              url={texts.TITLE_CONFIRMATION_IMG_URL}
            >
              <ConfirmationForm />
            </ContentWrapper>
          </FadeInWrapper>
        </React.Fragment>
      )}
      <FadeInWrapper scrollPositionBottom={scrollPositionBottom}>
        <ContentWrapper
          title={texts.PALETTE_TITLE}
          url={texts.TITLE_DRESSCODE_IMG_URL}
        >
          <Palette />
          <ContentText text={texts.PALETTE_TEXT} />
          <PaletteComment url={texts.TITLE_DRESSCODE_COMMENT_IMG_URL} />
        </ContentWrapper>
      </FadeInWrapper>
      <FadeInWrapper scrollPositionBottom={scrollPositionBottom}>
        <ContentWrapper
          title={texts.WISH_FOR_GIFTS_TITLE}
          url={texts.TITLE_GIFTS_IMG_URL}
        >
          <ContentText text={texts.WISH_FOR_GIFTS_TEXT} />
        </ContentWrapper>
      </FadeInWrapper>
      <BackgroundImg
        url="assets/img/branch_to_left_down.png"
        place="eighth" // second
        orientation="right"
      />
      <BackgroundImg url="assets/img/divorce-second.jpg" place="eighth-left" />

      <div className="wedding-app-location" />
      <FadeInWrapper scrollPositionBottom={scrollPositionBottom}>
        <ContentWrapper
          title={texts.CONTACTS_TITLE}
          url={texts.TITLE_CONTACTS_IMG_URL}
        >
          <ContentText text={texts.CONTACTS_TEXT} />
          <Contacts />
        </ContentWrapper>
      </FadeInWrapper>
      <BackgroundImg
        url="assets/img/divorce-last.jpg"
        place="last"
        orientation="right"
      />
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
