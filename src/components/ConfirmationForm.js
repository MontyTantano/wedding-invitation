import React from 'react';
import PropTypes from 'prop-types';
import ConfirmationFormStyleIgnored from './ConfirmationForm.scss';

const baseClassName = 'confirmation-form';

const ConfirmationFormItem = props => {
  const { fio, isAdult, handleItemChange, handleItemRemove, id } = props;
  return (
    <div className={`${baseClassName}-item`}>
      <input
        type="text"
        className={`${baseClassName}-input ${baseClassName}-item__fio-input`}
        value={fio}
        placeholder="Фамилия Имя и Отчество гостя..."
        onChange={({ target }) => handleItemChange({ id, fio: target.value })}
      />
      <button
        type="button"
        onClick={() => handleItemRemove(id)}
        className={`${baseClassName}-btn ${baseClassName}-item__btn-delete`}
      >
        Удалить
      </button>
      <button
        type="button"
        onClick={() => handleItemChange({ id, isAdult: true })}
        className={`${baseClassName}-btn ${baseClassName}-item__btn-adult ${
          isAdult ? `${baseClassName}-item__btn_active` : ''
        }`}
      >
        Взрослый
      </button>
      <button
        type="button"
        onClick={() => handleItemChange({ id, isAdult: false })}
        className={`${baseClassName}-btn ${baseClassName}-item__btn-child ${
          !isAdult ? `${baseClassName}-item__btn_active` : ''
        }`}
      >
        Ребенок
      </button>
    </div>
  );
};

const ConfirmationForm = props => {
  const {
    handleSubmite,
    handleFioChange,
    handleItemChange,
    handleItemAdd,
    handleItemRemove,
    isReceived,
    isSended,
    isValid,
    fio,
    items
  } = props;

  const invalidInfo = (
    <div className={`${baseClassName}-info ${baseClassName}-invalid-info`}>
      Проверьте корректность ввода
    </div>
  );

  const sendedInfo = (
    <div className={`${baseClassName}-info ${baseClassName}-sanded-info`}>
      Подтверждение отправлено...
    </div>
  );

  const receivedInfo = (
    <div className={`${baseClassName}-info ${baseClassName}-received-info`}>
      Подтверждение получено!
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
      {!isValid && invalidInfo}
      <input
        type="text"
        className={`${baseClassName}-input ${baseClassName}-fio-input ${
          isValid ? '' : `${baseClassName}-fio-input_invalid`
        }`}
        placeholder="Ваши Фамилия Имя и Отчество..."
        value={fio}
        onChange={handleFioChange}
      />
      {itemsView}
      <button
        type="button"
        onClick={handleItemAdd}
        className={`${baseClassName}-btn ${baseClassName}-btn-add`}
      >
        Добавить гостя
      </button>
      <button
        type="button"
        onClick={handleSubmite}
        className={`${baseClassName}-btn ${baseClassName}-btn-submite`}
      >
        Подтвердить
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
  handleFioChange: PropTypes.func.isRequired,
  handleItemChange: PropTypes.func.isRequired,
  handleItemAdd: PropTypes.func.isRequired,
  handleItemRemove: PropTypes.func.isRequired,
  isReceived: PropTypes.bool.isRequired,
  isSended: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
  fio: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object)
};

export default ConfirmationForm;
