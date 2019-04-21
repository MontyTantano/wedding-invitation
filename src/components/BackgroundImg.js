import React from 'react';
import PropTypes from 'prop-types';

import BackgroundImgStyleIgnored from './BackgroundImg.scss';

const baseClass = 'background-image';

const BackgroundImg = ({ url, place, orientation }) => (
  <div
    className={`${baseClass} ${baseClass}-${place} ${baseClass}-orientation-${orientation}`}
  >
    <img
      className={`${baseClass}__img ${baseClass}__img-${place} ${baseClass}__img-orientation-${orientation}`}
      src={url}
      alt="Фоновое изображение"
    />
  </div>
);

BackgroundImg.defaultProps = {
  url: '',
  place: '',
  orientation: 'left'
};

BackgroundImg.propTypes = {
  url: PropTypes.string,
  place: PropTypes.string,
  orientation: PropTypes.string
};

export default BackgroundImg;
