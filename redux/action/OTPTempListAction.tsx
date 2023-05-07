import { Constants, ApiEndPoints } from "../../Constants/Constants";
import { Dispatch } from "redux";
import axios from "axios";

export const GET_OTP_TEMP_LIST = "GET_OTP_TEMP_LIST";

export const getOTPList = () => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.getOTPTemp;
    try {
      const response = await axios.get(apiURL).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: GET_OTP_TEMP_LIST, data: response.data });
      }
    } catch (error) {}
  };
};
