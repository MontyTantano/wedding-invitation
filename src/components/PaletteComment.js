import React from 'react';
import PropTypes from 'prop-types';
import PaletteCommentStyleIgnored from './PaletteComment.scss';

const PaletteComment = ({ url }) => (
  <div className="palette-comment">
    <img className="palette-comment__img" src={url} alt="Иконки дресс-кода" />
  </div>
);

PaletteComment.defaultProps = {
  url: ''
};

PaletteComment.propTypes = {
  url: PropTypes.string
};

export default PaletteComment;
