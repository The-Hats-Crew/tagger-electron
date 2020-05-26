import {
  SET_EMAIL_OPERATION,
  DISCARD,
  CHECKING_NEW_MAIL_START,
  CHECKING_NEW_MAIL_SUCCESS,
  CHECKING_NEW_MAIL_FAILED
} from '../actions';

const initialState = {
  isHidden: true,
  messageType: null,
  isChecking: false,
  failed: false
};

export const setOperationReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case SET_EMAIL_OPERATION:
      return {
        ...state,
        isHidden: false,
        messageType: payload
      };
    case DISCARD:
      return {
        ...state,
        isHidden: true,
        messageType: null
      };
    case CHECKING_NEW_MAIL_START:
      return {
        ...state,
        isChecking: true,
        failed: false
      };
    case CHECKING_NEW_MAIL_SUCCESS:
      return {
        ...state,
        isChecking: false,
        failed: false
      };
    case CHECKING_NEW_MAIL_FAILED:
      return {
        ...state,
        isChecking: false,
        failed: true
      }
    default:
      return state;
  }
};
