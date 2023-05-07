import axios from "axios";
import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";

export const GET_LOCKED_CUSTOMER_DATA = "GET_LOCKED_CUSTOMER_DATA";
export const UNLOCKED_CUSTOMER_INFO = "UNLOCKED_CUSTOMER_INFO";
export const RESET_UNLOCKED_CUSTOMER_INFO = "RESET_UNLOCKED_CUSTOMER_INFO";

export const getLockedCustomerData = () => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.getLockedCustomerInfo;
    try {
      const lockedCustomerResponse = await axios
        .get(apiURL)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (lockedCustomerResponse) {
        dispatch({
          type: GET_LOCKED_CUSTOMER_DATA,
          data: lockedCustomerResponse,
        });
      }
    } catch (error) {}
  };
};

export const getLockedCustomerFilter = (value: any) => {
  return async (dispatch: Dispatch) => {
    let code = value.code.replace(/[^a-zA-Z0-9]/g, "");
    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.lockCustomerFilter +
      `?userName=${value.name}&mobileNumber=${
        value.number && `%2B${code}${value.number}`
      }`;
    try {
      const lockedCustomerResponse = await axios
        .get(apiURL)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (lockedCustomerResponse) {
        dispatch({
          type: GET_LOCKED_CUSTOMER_DATA,
          data: lockedCustomerResponse,
        });
      }
    } catch (error) {}
  };
};

export const unlockedCustomerStatus = (selectedCustomerInfo: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.unlockCustomerInfo;
    try {
      const unlockedCustomerResponse = await axios
        .post(apiURL, selectedCustomerInfo)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (unlockedCustomerResponse) {
        dispatch({
          type: UNLOCKED_CUSTOMER_INFO,
          data: unlockedCustomerResponse,
        });
      }
    } catch (error) {}
  };
};

export const resetUnlockData = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_UNLOCKED_CUSTOMER_INFO });
  };
};
