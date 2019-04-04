import React from 'react';
import PropTypes from 'prop-types';
import ContentWrapperStyleIgnored from './ContentWrapper.scss';

const ContentWrapper = ({ children, title }) => {
  const titleBlock = title && (
    <div className="content-wrapper-title">
      <span className="content-wrapper-title__text">{title}</span>
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
  children: null // or [] I guess
};

ContentWrapper.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
};

export default ContentWrapper;
