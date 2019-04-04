import React from 'react';
import PropTypes from 'prop-types';
import * as texts from '../constants/texts';
import ConfirmationFormStyleIgnored from './ConfirmationForm.scss';

const baseClassName = 'confirmation-form';

const ConfirmationFormItem = props => {
  const { fio, handleItemRemove, id } = props;
  return (
    <div className={`${baseClassName}-item`}>
      <div className={`${baseClassName}-fio-text`}>{fio}</div>
      <button
        type="button"
        onClick={() => handleItemRemove(id)}
        className={`${baseClassName}-btn ${baseClassName}-item__btn-delete`}
      >
        {texts.CONFIRMATION_FORM_ITEM_REMOVE}
      </button>
    </div>
  );
};

const ConfirmationForm = props => {
  const {
    handleSubmite,
    handleCancel,
    handleItemChange,
    handleItemRemove,
    isReceived,
    isSended,
    fio,
    items
  } = props;

  const sendedInfo = (
    <div className={`${baseClassName}-info ${baseClassName}-info_sanded`}>
      {texts.CONFIRMATION_FORM_SENDED_INFO}
    </div>
  );

  const receivedInfo = (
    <div className={`${baseClassName}-info ${baseClassName}-info_received`}>
      {texts.CONFIRMATION_FORM_RECEIVED_INFO}
    </div>
  );

  const itemsView = items.map(item => (
    <ConfirmationFormItem
      id={item.id}
      fio={item.fio}
      isAdult={item.isAdult}
      handleItemChange={handleItemChange}
      handleItemRemove={handleItemRemove}
      key={item.id}
    />
  ));

  const formContent = (
    <form className={`${baseClassName}-form`}>
      <div className={`${baseClassName}-fio-text`}>{fio}</div>
      {itemsView}
      <button
        type="button"
        onClick={handleSubmite}
        className={`${baseClassName}-btn ${baseClassName}-btn-submite`}
      >
        {texts.CONFIRMATION_FORM_SUBMITE}
      </button>
      <button
        type="button"
        onClick={handleCancel}
        className={`${baseClassName}-btn-cancel`}
      >
        {items.length > 1
          ? texts.CONFIRMATION_FORM_CANCEL
          : texts.CONFIRMATION_FORM_CANCEL_SINGL}
      </button>
    </form>
  );

  return (
    <div className={`${baseClassName}`}>
      {!isSended && !isReceived && formContent}
      {isSended && !isReceived && sendedInfo}
      {isReceived && receivedInfo}
    </div>
  );
};

ConfirmationForm.defaultProps = {
  fio: '',
  items: []
};

ConfirmationForm.propTypes = {
  handleSubmite: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleItemChange: PropTypes.func.isRequired,
  handleItemRemove: PropTypes.func.isRequired,
  isReceived: PropTypes.bool.isRequired,
  isSended: PropTypes.bool.isRequired,
  fio: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object)
};

export default ConfirmationForm;
