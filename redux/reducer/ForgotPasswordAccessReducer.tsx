import {
  CREATE_FORGOT_ACCESS,
  CREATE_STAFF_PASSWORD_ACCESS,
  RESET_CREATE_FORGOT_ACCESS,
  CHANGE_PASSWORD_RESPONSE,
  RESET_CHANGE_PASSWORD_RESPONSE,
  VALIDATE_RESET_PASSWORD_TOKEN,
  RESET_CHANGE_NEW_PASSWORD_RESPONSE,
} from "../action/ForgotPasswordAction";

const initialState = {};

const ForgetPasswordAccessReducer = (
  state = initialState,
  action: { type: string; data: any }
) => {
  switch (action.type) {
    case CREATE_FORGOT_ACCESS:
      return { ...state, createForgotPasswordResponse: action.data };
    case RESET_CREATE_FORGOT_ACCESS:
      return { ...state, createForgotPasswordResponse: [] };
    case CREATE_STAFF_PASSWORD_ACCESS:
      return { ...state, createForcedPasswordResponse: action.data };
    case CHANGE_PASSWORD_RESPONSE:
      return { ...state, changePasswordResponse: action.data };
    case RESET_CHANGE_PASSWORD_RESPONSE:
      return { ...state, changePasswordResponse: [] };
    case VALIDATE_RESET_PASSWORD_TOKEN:
      return { ...state, validateResetPasswordResponse: action.data };
    case RESET_CHANGE_NEW_PASSWORD_RESPONSE:
      return { ...state, changeNewPasswordDataResponse: action.data };
    default:
      return state;
  }
};
export default ForgetPasswordAccessReducer;
