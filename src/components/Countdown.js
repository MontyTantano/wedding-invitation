import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { pluralizing, addLeadingZeros } from '../utils';
import CountdownStyleIgnored from './Countdown.scss';

const Countdown = ({ days, hours, min, sec }) => (
  <div className="countdown">
    <div className="countdown-item">
      <div className="countdown-item__count">
        {addLeadingZeros(days)}
      </div>
      <div className="countdown-item__text">
        {pluralizing({
          count: days,
          one: 'День',
          two: 'Дня',
          five: 'Дней'
        })}
      </div>
    </div>

    <div className="countdown-item">
      <div className="countdown-item__count">
        {addLeadingZeros(hours)}
      </div>
      <div className="countdown-item__text">
        {pluralizing({
          count: hours,
          one: 'Час',
          two: 'Часа',
          five: 'Часов'
        })}
      </div>
    </div>

    <div className="countdown-item">
      <div className="countdown-item__count">
        {addLeadingZeros(min)}
      </div>
      <div className="countdown-item__text">
        {pluralizing({
          count: min,
          one: 'Минута',
          two: 'Минуты',
          five: 'Минут'
        })}
      </div>
    </div>

    <div className="countdown-item">
      <div className="countdown-item__count">
        {addLeadingZeros(sec)}
      </div>
      <div className="countdown-item__text">
        {pluralizing({
          count: sec,
          one: 'Секунда',
          two: 'Секунды',
          five: 'Секунд'
        })}
      </div>
    </div>
  </div>
);

Countdown.propTypes = {
  days: PropTypes.number,
  hours: PropTypes.number,
  min: PropTypes.number,
  sec: PropTypes.number,
};

Countdown.defaultProps = {
  days: 0,
  hours: 0,
  min: 0,
  sec: 0,
};

export default Countdown;
