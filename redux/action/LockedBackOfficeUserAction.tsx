import axios from "axios";
import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";

export const GET_LOCKED_BACK_OFFICE_DATA = "GET_LOCKED_BACK_OFFICE_DATA";
export const UNLOCKED_BACK_OFFICE_INFO = "UNLOCKED_BACK_OFFICE_INFO";

export const getLockedBackOfficeData = (emailId: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.getLockedBackOfficeInfo +
      `?emailId=${emailId}`;
    try {
      const lockedBackOfficeResponse = await axios
        .get(apiURL)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (lockedBackOfficeResponse) {
        dispatch({
          type: GET_LOCKED_BACK_OFFICE_DATA,
          data: lockedBackOfficeResponse,
        });
      }
    } catch (error) {}
  };
};

export const unlockedBackOffficeStatus = (selectedCustomerInfo: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.unlockBackOfficeInfo;
    try {
      const unlockedBackofficeResponse = await axios
        .post(apiURL, selectedCustomerInfo)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (unlockedBackofficeResponse) {
        dispatch({
          type: UNLOCKED_BACK_OFFICE_INFO,
          data: unlockedBackofficeResponse,
        });
      }
    } catch (error) {}
  };
};

export const resetUpdateUnlock = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: UNLOCKED_BACK_OFFICE_INFO });
  };
};
