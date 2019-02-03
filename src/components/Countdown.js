import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { pluralizing } from '../utils';
import CountdownStyleIgnored from './Countdown.scss';

const addLeadingZeros = value => {
  const stringValue = String(value);
  if (stringValue.length < 2) {
    return `0${stringValue}`;
  }
  return stringValue;
};

const calculateCountdown = endDate => {
  let diff = (Date.parse(new Date(endDate)) - Date.parse(new Date())) / 1000;

  // clear countdown when date is reached
  if (diff <= 0) {
    return null;
  }

  const timeLeft = {
    years: 0,
    days: 0,
    hours: 0,
    min: 0,
    sec: 0
  };

  // calculate time difference between now and expected date
  if (diff >= 365.25 * 86400) {
    // 365.25 * 24 * 60 * 60
    timeLeft.years = Math.floor(diff / (365.25 * 86400));
    diff -= timeLeft.years * 365.25 * 86400;
  }
  if (diff >= 86400) {
    // 24 * 60 * 60
    timeLeft.days = Math.floor(diff / 86400);
    diff -= timeLeft.days * 86400;
  }
  if (diff >= 3600) {
    // 60 * 60
    timeLeft.hours = Math.floor(diff / 3600);
    diff -= timeLeft.hours * 3600;
  }
  if (diff >= 60) {
    timeLeft.min = Math.floor(diff / 60);
    diff -= timeLeft.min * 60;
  }
  timeLeft.sec = diff;

  return timeLeft;
};

class Countdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      days: 0,
      hours: 0,
      min: 0,
      sec: 0
    };
  }

  componentDidMount() {
    const { date } = this.props;
    // update every second
    this.interval = setInterval(() => {
      const countdown = calculateCountdown(date);
      if (countdown) {
        return this.setState(countdown);
      }
      return this.stop();
    }, 1000);
  }

  componentWillUnmount() {
    this.stop();
  }

  stop() {
    clearInterval(this.interval);
  }

  render() {
    const countDown = this.state;

    return (
      <div className="countdown">
        <div className="countdown-item">
          <div className="countdown-item__count">
            {addLeadingZeros(countDown.days)}
          </div>
          <div className="countdown-item__text">
            {pluralizing({
              count: countDown.days,
              one: 'День',
              two: 'Дня',
              five: 'Дней'
            })}
          </div>
        </div>

        <div className="countdown-item">
          <div className="countdown-item__count">
            {addLeadingZeros(countDown.hours)}
          </div>
          <div className="countdown-item__text">
            {pluralizing({
              count: countDown.hours,
              one: 'Час',
              two: 'Часа',
              five: 'Часов'
            })}
          </div>
        </div>

        <div className="countdown-item">
          <div className="countdown-item__count">
            {addLeadingZeros(countDown.min)}
          </div>
          <div className="countdown-item__text">
            {pluralizing({
              count: countDown.min,
              one: 'Минута',
              two: 'Минуты',
              five: 'Минут'
            })}
          </div>
        </div>

        <div className="countdown-item">
          <div className="countdown-item__count">
            {addLeadingZeros(countDown.sec)}
          </div>
          <div className="countdown-item__text">
            {pluralizing({
              count: countDown.sec,
              one: 'Секунда',
              two: 'Секунды',
              five: 'Секунд'
            })}
          </div>
        </div>
      </div>
    );
  }
}

Countdown.propTypes = {
  date: PropTypes.string.isRequired
};

export default Countdown;
