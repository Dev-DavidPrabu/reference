import axios from "axios";
import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";

export const USER_LOGIN = "USER_LOGIN";
export const RESET_LOGIN_INFO = "RESET_LOGIN_INFO";
export const GET_LOGGED_IN_USER_INFO = "GET_LOGGED_IN_USER_INFO";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const GET_USERACCESS_INFO = "GET_USERACCESS_INFO";
export const RESET_USER_LOGIN = "RESET_USER_LOGIN";
export const RESET_LOGGED_IN_USER_INFO = "RESET_LOGGED_IN_USER_INFO";
export const LOGOUT_USER_RESPONSE = "LOGOUT_USER_RESPONSE";

export const authenticationOfUser = (apiBody: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.userauthentication;
    const response = await axios.post(apiURL, apiBody).then((_response) => {
      return _response.data;
    });

    if (response.data) {
      if (response.data.idToken) {
        const gettingSelectedUserresponse = await axios
          .get(Constants.BaseURL + ApiEndPoints.gettingLoggedInUserInfo, {
            headers: {
              Authorization: "Bearer " + response.data.idToken,
              "x-session-id": response.data.sessionId,
            },
          })
          .then(async (_response2) => {
            await axios
              .get(Constants.BaseURL + ApiEndPoints.userAccessList, {
                headers: {
                  Authorization: "Bearer " + response.data.idToken,
                  "x-session-id": response.data.sessionId,
                },
              })
              .then(async (_response3) => {
                if (_response3.data) {
                  return (
                    dispatch({ type: USER_LOGIN, data: response.data }),
                    dispatch({
                      type: GET_LOGGED_IN_USER_INFO,
                      data: _response2.data.data,
                    }),
                    dispatch({
                      type: GET_USERACCESS_INFO,
                      data: _response3.data?.data,
                    })
                  );
                } else {
                  return (
                    dispatch({ type: USER_LOGIN, data: response.data }),
                    dispatch({
                      type: GET_LOGGED_IN_USER_INFO,
                      data: _response2.data.data,
                    }),
                    dispatch({ type: GET_USERACCESS_INFO, data: [] })
                  );
                }
              });
          });
      } else {
        return dispatch({ type: USER_LOGIN, data: response.data });
      }
    } else {
      return dispatch({ type: USER_LOGIN, data: response });
    }
  };
};

export const userLogout = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_LOGIN_INFO });
    dispatch({ type: RESET_LOGGED_IN_USER_INFO });
  };
};
export const resetUserInitialLogin = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_USER_LOGIN });
  };
};

export const logOutUser = (body:any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.userLogOut;
    const response = await axios.post(apiURL,body).then((_response) => {
      return _response?.data;
    });
    const responseData = response;
    dispatch({ type: LOGOUT_USER_RESPONSE, data: responseData });
  };
};

export const loginUserInfo = (IdToken: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.userauthentication;
    const response = await axios.get(apiURL).then((_response) => {
      return _response.data;
    });
    const responseData = response;
    dispatch({ type: GET_LOGGED_IN_USER_INFO, data: responseData });
  };
};
