import React from 'react';
import GreetingPhotoStyleIgnored from './GreetingPhoto.scss';

const GreetingPhoto = () => (
  <div className="greeting-photo">
    <picture className="greeting-photo-picture">
      <source
        srcSet="assets/img/greeting-photo-wide@1x.webp 1x"
        media="(min-width: 768px)"
        type="image/webp"
      />
      <source
        srcSet="assets/img/greeting-photo-wide@1x.png 1x"
        media="(min-width: 768px)"
        type="image/png"
      />
      <source
        srcSet="assets/img/greeting-photo-square@1x.webp 1x"
        type="image/webp"
      />
      <img
        className="greeting-photo-picture__img"
        src="assets/img/greeting-photo-square@1x.jpg"
        alt="Олег и Татьяна"
      />
    </picture>
  </div>
);

export default GreetingPhoto;
