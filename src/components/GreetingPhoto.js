import React from 'react';
import GreetingPhotoStyleIgnored from './GreetingPhoto.scss';

const GreetingPhoto = () => (
  <div className="greeting-photo">
    <picture className="greeting-photo-picture">
      <source srcSet="assets/img/greeting-photo@1x.webp" type="image/webp" />
      <img
        className="greeting-photo-picture__img"
        src="assets/img/greeting-photo@1x.png"
        alt="Олег и Татьяна"
      />
    </picture>
  </div>
);

export default GreetingPhoto;
