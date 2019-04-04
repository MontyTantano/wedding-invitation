import React, { Component } from 'react';
import { connect } from 'react-redux';

import { changeCountdown } from '../actions';
import { calculateCountdown } from '../utils';
import * as texts from '../constants/texts';
import Countdown from '../components/Countdown';

class CountdownContainer extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    // update every second
    this.interval = setInterval(() => {
      const countdown = calculateCountdown(texts.EVENT_DATE);
      if (countdown) {
        dispatch(changeCountdown(countdown));
        return;
      }
      this.stop();
    }, 1000);
  }

  componentWillUnmount() {
    this.stop();
  }

  stop() {
    clearInterval(this.interval);
  }

  render() {
    const {
      countdown: { days, hours, min, sec }
    } = this.props;
    return <Countdown days={days} hours={hours} min={min} sec={sec} />;
  }
}

function mapStateToProps(state) {
  const { countdown } = state;

  return {
    countdown
  };
}

export default connect(mapStateToProps)(CountdownContainer);
