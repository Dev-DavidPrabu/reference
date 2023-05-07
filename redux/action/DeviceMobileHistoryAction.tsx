import axios from "axios";
import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";

export const GET_MOBILE_HISTORY_REGORDS_DATA =
  "GET_MOBILE_HISTORY_REGORDS_DATA";
export const GET_DEVICE_HISTORY_REGORDS_DATA =
  "GET_DEVICE_HISTORY_REGORDS_DATA";

export const getMobileHistoryRecords = (mobileNumber: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.getMobileHistoryList +
      `?mobileNumber=${mobileNumber}`;
    try {
      const mobileHistoryRegordsResponse = await axios
        .get(apiURL)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (mobileHistoryRegordsResponse) {
        dispatch({
          type: GET_MOBILE_HISTORY_REGORDS_DATA,
          data: mobileHistoryRegordsResponse,
        });
      }
    } catch (error) {}
  };
};

export const getDeviceHistoryRecords = (deviceId: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.getDeviceHistoryList +
      `?deviceId=${deviceId}`;
    try {
      const deviceHistoryRegordsResponse = await axios
        .get(apiURL)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (deviceHistoryRegordsResponse) {
        dispatch({
          type: GET_DEVICE_HISTORY_REGORDS_DATA,
          data: deviceHistoryRegordsResponse,
        });
      }
    } catch (error) {}
  };
};
