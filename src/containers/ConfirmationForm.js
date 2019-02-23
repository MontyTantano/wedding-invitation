import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  sendConfirmationForm,
  validateConfirmationForm,
  changeConfirmationForm,
  addConfirmationFormItem,
  changeConfirmationFormItem,
  removeConfirmationFormItem
} from '../actions';
import { newid } from '../utils';
import ConfirmationForm from '../components/ConfirmationForm';

function fioIsValid(fio) {
  return !!(fio && fio.length > 0);
}

class ConfirmationFormContainer extends Component {
  constructor(props) {
    super(props);
    this.handleSubmite = this.handleSubmite.bind(this);
    this.handleFioChange = this.handleFioChange.bind(this);
    this.handleItemChange = this.handleItemChange.bind(this);
    this.handleItemAdd = this.handleItemAdd.bind(this);
    this.handleItemRemove = this.handleItemRemove.bind(this);
  }

  handleSubmite() {
    const { dispatch, fio, items } = this.props;
    const isValid = fioIsValid(fio);
    dispatch(validateConfirmationForm(isValid));
    if (isValid) {
      dispatch(
        sendConfirmationForm({
          fio,
          items
        })
      );
    }
  }

  handleFioChange(event = {}) {
    const { dispatch } = this.props;
    const fio = event.target && event.target.value;
    const isValid = fioIsValid(fio);
    dispatch(validateConfirmationForm(isValid));
    dispatch(changeConfirmationForm(fio));
  }

  handleItemChange(item) {
    const { dispatch } = this.props;
    dispatch(changeConfirmationFormItem(item));
  }

  handleItemAdd() {
    const { dispatch } = this.props;
    const id = newid();
    dispatch(addConfirmationFormItem({ id }));
  }

  handleItemRemove(id) {
    const { dispatch } = this.props;
    dispatch(removeConfirmationFormItem(id));
  }

  render() {
    const { isReceived, isSended, isValid, fio, items } = this.props;
    return (
      <ConfirmationForm
        handleSubmite={this.handleSubmite}
        handleFioChange={this.handleFioChange}
        handleItemChange={this.handleItemChange}
        handleItemAdd={this.handleItemAdd}
        handleItemRemove={this.handleItemRemove}
        isReceived={isReceived}
        isSended={isSended}
        isValid={isValid}
        fio={fio}
        items={items}
      />
    );
  }
}

function mapStateToProps(state = {}) {
  const { isReceived, isSended, isValid, fio, items } = state.form;

  return {
    isReceived,
    isSended,
    isValid,
    fio,
    items
  };
}

export default connect(mapStateToProps)(ConfirmationFormContainer);
