import axios from "axios";
import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";

export const GET_LOGIN_REGORDS_DATA = "GET_LOGIN_REGORDS_DATA";
export const RESET_LOGIN_RECORDS_DATA = "RESET_LOGIN_RECORDS_DATA";

export const getLoginRecords = (
  mobileNo: any,
  deviceId: any,
  startDate: any,
  endDate: any
) => {
  return async (dispatch: Dispatch) => {
    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.staffLoginRegords +
      `?mobileNo=${mobileNo}&deviceId=${deviceId}&startDate=${startDate}&endDate=${endDate}`;
    try {
      const loginRegordsResponse = await axios.get(apiURL).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (loginRegordsResponse) {
        dispatch({ type: GET_LOGIN_REGORDS_DATA, data: loginRegordsResponse });
      }
    } catch (error) {}
  };
};

export const resetLoginRecords = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_LOGIN_RECORDS_DATA });
  };
};
