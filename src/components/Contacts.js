import React from 'react';
import * as texts from '../constants/texts';

import ContactsStyleIgnored from './Contacts.scss';

const baseClass = 'contacts';

const Contacts = () => (
  <div className={baseClass}>
    <div className={`${baseClass}__col ${baseClass}__col-first`}>
      <div className={`${baseClass}-name`}>{texts.CONTACTS_PHONE_1_NAME}</div>
      <a
        href={`tel:${texts.CONTACTS_PHONE_1}`}
        className={`${baseClass}-phone`}
        target="_blanc"
      >
        {texts.CONTACTS_PHONE_1}
      </a>
      <a
        href={`${texts.CONTACTS_PHONE_2_WHATSAPP_LINK}`}
        className={`${baseClass}-whatsapp`}
        target="_blanc"
      >
        <img
          className={`${baseClass}-whatsapp__img`}
          src="assets/img/whatsapp.png"
          alt="whatsapp logo"
        />
      </a>
    </div>
    <div className={`${baseClass}__col ${baseClass}__col-second`}>
      <div className={`${baseClass}-name`}>{texts.CONTACTS_PHONE_2_NAME}</div>
      <a
        href={`tel:${texts.CONTACTS_PHONE_2}`}
        className={`${baseClass}-phone`}
        target="_blanc"
      >
        {texts.CONTACTS_PHONE_2}
      </a>
      <a
        href={`${texts.CONTACTS_PHONE_2_WHATSAPP_LINK}`}
        className={`${baseClass}-whatsapp`}
        target="_blanc"
      >
        <img
          className={`${baseClass}-whatsapp__img`}
          src="assets/img/whatsapp.png"
          alt="whatsapp logo"
        />
      </a>
    </div>
  </div>
);

export default Contacts;
