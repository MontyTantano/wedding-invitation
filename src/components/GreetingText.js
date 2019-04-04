import React from 'react';
import PropTypes from 'prop-types';
import { newid } from '../utils';
import GreetingTextStyleIgnored from './GreetingText.scss';

const GreetingText = ({ texts = [] }) => {
  const rows = texts.map(text => (
    <span key={newid('GreetingText')}>{text}</span>
  ));
  return <h1 className="greeting-text">{rows}</h1>;
};

GreetingText.defaultProps = {
  texts: []
};

GreetingText.propTypes = {
  texts: PropTypes.arrayOf(PropTypes.string)
};

export default GreetingText;
