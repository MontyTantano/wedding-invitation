import { combineReducers } from 'redux';
import Constants from './constants/actions';

function addFormItem(state, action) {
  return {
    ...state,
    items: [
      ...state.items,
      {
        ...action.payload,
      },
    ],
  };
}

function removeFormItem(state, action) {
  return {
    ...state,
    items: state.items.reduce((res, item) => {
      if (item.id !== action.payload.id) {
        res.push({
          ...item,
        });
      }
      return res;
    }, []),
  };
}

function changeFormItem(state, action) {
  return {
    ...state,
    items: state.items.map((item) => {
      if (item.id === action.payload.id) {
        return {
          ...action.payload,
        };
      }
      return {
        ...item,
      };
    }),
  }
}

function updateFromPayload(state, action) {
  return {
    ...state,
    ...action.payload,
  };
}

function form(
  state = {
    isReceived: false,
    isSended: false,
    isValid: true,
    fio: '',
    items: [],
  },
  action
) {
  switch (action.type) {
    case Constants.REMOVE_CONFIRMATION_FORM_ITEM:
      return removeFormItem(state, action);
    case Constants.ADD_CONFIRMATION_FORM_ITEM:
      return addFormItem(state, action);
    case Constants.CHANGE_CONFIRMATION_FORM_ITEM:
      return changeFormItem(state, action);
    case Constants.RECEIVED_CONFIRMATION_FORM:
    case Constants.SENDED_CONFIRMATION_FORM:
    case Constants.VALIDATE_CONFIRMATION_FORM:
      return updateFromPayload(state, action);
    default:
      return state;
  }
}

function countdown(
  state = {
    days: 0,
    hours: 0,
    min: 0,
    sec: 0,
  },
  action
) {
  switch (action.type) {
    case Constants.CHANGE_COUNTDOWN:
      return updateFromPayload(state, action);
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  form,
  countdown,
});

export default rootReducer;
