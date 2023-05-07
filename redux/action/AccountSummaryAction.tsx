import { Constants, ApiEndPoints } from "../../Constants/Constants";
import { Dispatch } from "redux";
import axios from "axios";

export const GET_ALL_ACCOUNT_SUMMARY = "GET_ALL_ACCOUNT_SUMMARY";
export const RESET_ALL_ACCOUNT_SUMMARY = "RESET_ALL_ACCOUNT_SUMMARY";
export const CREATE_ACCOUNT_SUMMARY = "CREATE_ACCOUNT_SUMMARY";
export const RESET_CREATE_SUMMARY = "RESET_CREATE_SUMMARY";
export const UPDATE_ACCOUNT_SUMMARY = "UPDATE_ACCOUNT_SUMMARY";
export const RESET_UPDATE_SUMMARY = "RESET_UPDATE_SUMMARY";

export const getAllAccountSummary = () => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.getAllAccountSummary;
    try {
      const response = await axios.get(apiURL).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: GET_ALL_ACCOUNT_SUMMARY, data: response.data });
      }
    } catch (error) {}
  };
};

export const createAccountSummary = (value: any) => {
  return async (dispatch: Dispatch) => {
    try {
      const apiURL = Constants.BaseURL + ApiEndPoints.addNewAccountSummary;
      const response = await axios.post(apiURL, value).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: CREATE_ACCOUNT_SUMMARY, data: response });
      }
    } catch (error) {}
  };
};

export const updateAccountSummary = (value: any) => {
  return async (dispatch: Dispatch) => {
    try {
      const apiURL = Constants.BaseURL + ApiEndPoints.updateAccountSummary;
      const response = await axios.post(apiURL, value).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: UPDATE_ACCOUNT_SUMMARY, data: response });
      }
    } catch (error) {}
  };
};

export const resetCreateAccountSummary = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_CREATE_SUMMARY });
  };
};

export const resetAllAccountSummary = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_ALL_ACCOUNT_SUMMARY });
  };
};
export const resetUpdateAccountSummary = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_UPDATE_SUMMARY });
  };
};
