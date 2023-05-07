import axios from "axios";
import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";

export const CREATE_FORGOT_ACCESS = "CREATE_FORGOT_ACCESS";
export const CREATE_STAFF_PASSWORD_ACCESS = "CREATE_STAFF_PASSWORD_ACCESS";
export const CHANGE_PASSWORD_RESPONSE = "CHANGE_PASSWORD_RESPONSE";
export const RESET_CHANGE_PASSWORD_RESPONSE = "RESET_CHANGE_PASSWORD_RESPONSE";
export const VALIDATE_RESET_PASSWORD_TOKEN = "VALIDATE_RESET_PASSWORD_TOKEN";
export const RESET_CHANGE_NEW_PASSWORD_RESPONSE =
  "RESET_CHANGE_NEW_PASSWORD_RESPONSE";
export const RESET_CREATE_FORGOT_ACCESS = "RESET_CREATE_FORGOT_ACCESS";

export const createForcedChangePasswordAccess = (userData: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.forcedChangePasswordInfo;
    const response = await axios.post(apiURL, userData).then((_response) => {
      return _response?.data;
    });
    if (response) {
      dispatch({ type: CHANGE_PASSWORD_RESPONSE, data: response });
    }
  };
};

export const clearChangePasswordData = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_CHANGE_PASSWORD_RESPONSE });
  };
};

export const changeNewPasswordData = (loginData: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.resetForgetWithNewPassword;
    try {
      const changeNewPasswordResponse = await axios
        .post(apiURL, loginData)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (changeNewPasswordResponse) {
        dispatch({
          type: RESET_CHANGE_NEW_PASSWORD_RESPONSE,
          data: changeNewPasswordResponse,
        });
      }
    } catch (error) {}
  };
};

export const validateResetPassword = (maildId: any, validateToken: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.validateUserForgetMailToken;
    try {
      var requestOptions: any = {
        method: "POST",
        body: JSON.stringify({
          token: validateToken,
          emailAddress: maildId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const validateResponse = await fetch(apiURL, requestOptions)
        .then((response) => response.json())
        .then((res) => {
          return res;
        });
      if (validateResponse) {
        dispatch({
          type: VALIDATE_RESET_PASSWORD_TOKEN,
          data: validateResponse,
        });
      }
    } catch (error) {}
  };
};
export const createForgetPasswordAccess = (mailId: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.forgetPasswordInfo +
      `?emailAddress=${mailId}`;
    try {
      const createResponse = await fetch(apiURL, {
        method: "POST",
      }).then(async (response) => {
        var value = await response.json();
        if (value) {
          return value;
        } else {
          return false;
        }
      });
      if (createResponse) {
        dispatch({ type: CREATE_FORGOT_ACCESS, data: createResponse });
      }
    } catch (error) {}
  };
};

export const clearForgotPasswordData = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_CREATE_FORGOT_ACCESS });
  };
};
