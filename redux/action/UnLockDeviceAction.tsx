import axios from "axios";
import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";

export const GET_UNBLOCKDEVICE_SUMMARY = "GET_UNBLOCKDEVICE_SUMMARY";

export const getUlockDeviceData = (deviceid: any, mobileno: any) => {
  const Params: any = {
    mobileNumber: mobileno,
    deviceId: deviceid,
    startDate: "",
    endDate: "",
  };
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.unBlockDevice;
    try {
      const getResponse = await axios
        .get(apiURL, { params: Params })
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (getResponse) {
        dispatch({ type: GET_UNBLOCKDEVICE_SUMMARY, data: getResponse });
      }
    } catch (error) {}
  };
};
