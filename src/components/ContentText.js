import React from 'react';
import PropTypes from 'prop-types';
import ContentTextStyleIgnored from './ContentText.scss';

const ContentText = ({ text }) => <div className="content-text"> {text} </div>;

ContentText.defaultProps = {
  text: ''
};

ContentText.propTypes = {
  text: PropTypes.string
};

export default ContentText;
