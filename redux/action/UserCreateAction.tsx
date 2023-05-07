import axios from "axios";
import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";

export const POST_CREATE_DATA = "POST_CREATE_DATA";
export const GET_USER_DATA = "GET_USER_DATA";
export const RESET_CREATE_INFO = "RESET_CREATE_INFO";
export const UPDATE_USER_DATA = "UPDATE_USER_DATA";
export const RESET_UPDATE_INFO = "RESET_UPDATE_INFO";
export const GET_USER_BRANCH_LIST = "GET_USER_BRANCH_LIST";
export const POST_CREATE_DATA_STATUS = "POST_CREATE_DATA_STATUS";
export const createUser = (userData: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.userCreate;
    try {
      dispatch({ type: "POST_CREATE_DATA_STATUS", data: "pending" });
      const createResponse = await axios
        .post(apiURL, userData)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (createResponse) {
        dispatch({ type: "POST_CREATE_DATA_STATUS", data: "success" });
        dispatch({ type: POST_CREATE_DATA, data: createResponse });
      }
    } catch (error) {}
  };
};

export const clearCreateInfo = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_CREATE_INFO });
  };
};

export const clearUpdateInfo = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_UPDATE_INFO });
  };
};

export const updateUser = (userData: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.userUpdate;
    try {
      const updateResponse = await axios
        .post(apiURL, userData)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (updateResponse) {
        dispatch({ type: UPDATE_USER_DATA, data: updateResponse });
      }
    } catch (error) {}
  };
};

export const getUserData = (userDetails: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.userList;
    try {
      const getResponse = await axios
        .get(apiURL, userDetails)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (getResponse) {
        dispatch({ type: GET_USER_DATA, data: getResponse });
      }
    } catch (error) {}
  };
};

export const getUserBranchList = () => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.getBranchUserList;
    try {
      const getResponse = await axios.get(apiURL).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (getResponse) {
        dispatch({ type: GET_USER_BRANCH_LIST, data: getResponse });
      }
    } catch (error) {}
  };
};
