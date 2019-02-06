import Constants from './constants/actions';
// import fetch from 'cross-fetch';

function formIsSended() {
  return {
    type: Constants.SENDED_CONFIRMATION_FORM,
    payload: {
      isSended: true,
    },
  };
}

function formIsReceived() {
  return {
    type: Constants.RECEIVED_CONFIRMATION_FORM,
    payload: {
      isReceived: true,
    },
  };
}

function sendForm(formJSON) {
  return dispatch => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(dispatch(formIsReceived()))
      }, 1000);
    });
  };
}

export function changeCountdown(countdown = {}) {
  return {
    type: Constants.CHANGE_COUNTDOWN,
    payload: {
      ...countdown,
    }
  }
}

export function removeConfirmationFormItem(id = '') {
  return {
    type: Constants.REMOVE_CONFIRMATION_FORM_ITEM,
    payload: {
      id,
    }
  }
}

export function changeConfirmationFormItem(changedItem = {}) {
  return {
    type: Constants.CHANGE_CONFIRMATION_FORM_ITEM,
    payload: {
      ...changedItem,
    }
  }
}

export function addConfirmationFormItem(newItem = {}) {
  return {
    type: Constants.ADD_CONFIRMATION_FORM_ITEM,
    payload: {
      ...newItem,
    }
  }
}

export function confirmationFormChange(fio = '') {
  return {
    type: Constants.CHANGE_CONFIRMATION_FORM,
    payload: {
      fio,
    }
  }
}

export function validateConfirmationForm(isValid) {
  return {
    type: Constants.VALIDATE_CONFIRMATION_FORM,
    payload: {
      isValid,
    }
  };
}

export function sendConfirmationForm(formJSON = {}) {
  return (dispatch) => {
    dispatch(formIsSended());
    return dispatch(sendForm(formJSON));
  };
}
