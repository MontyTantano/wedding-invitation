import React from 'react';
import PropTypes from 'prop-types';
import ContentWrapperStyleIgnored from './ContentWrapper.scss';

const ContentWrapper = ({ children, title, url }) => {
  const titleBlock = title && (
    <div className="content-wrapper-title">
      <img className="content-wrapper-title__img" src={url} alt={title} />
    </div>
  );
  return (
    <div className="content-wrapper">
      {titleBlock}
      {children}
    </div>
  );
};

ContentWrapper.defaultProps = {
  title: '',
  children: null, // or [] I guess
  url: ''
};

ContentWrapper.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]),
  url: PropTypes.string
};

export default ContentWrapper;
