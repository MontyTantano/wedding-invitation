import React from 'react';
import ContentWrapperStyleIgnored from './ContentWrapper.scss';

const ContentWrapper = ({ children, title }) => {
  const titleBlock = title && (
    <div className="content-wrapper-title">{title}</div>
  );
  return (
    <div className="content-wrapper">
      {titleBlock}
      {children}
    </div>
  );
};

export default ContentWrapper;
