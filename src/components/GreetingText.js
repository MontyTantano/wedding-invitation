import React from 'react';
import PropTypes from 'prop-types';
import GreetingTextStyleIgnored from './GreetingText.scss';

const GreetingText = ({ url }) => (
  <h1 className="greeting-text">
    <img
      className="greeting-text__img"
      src={url}
      alt="Свадьба Олег и Татьяна 10 мая 2019 года"
    />
  </h1>
);

GreetingText.defaultProps = {
  url: ''
};

GreetingText.propTypes = {
  url: PropTypes.string
};

export default GreetingText;
