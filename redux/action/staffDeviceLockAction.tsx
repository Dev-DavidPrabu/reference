import { Constants, ApiEndPoints } from "../../Constants/Constants";
import { Dispatch } from "redux";
import axios from "axios";

export const POST_CUSTOMER_LOCKINFO = "POST_CUSTOMER_LOCKINFO";
export const ERROR_CUSTMER_LOCKINFO = "ERROR_CUSTMER_LOCKINFO";

export const updateCustomerLock = (userData: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.staffDeviceLock;
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
        dispatch({ type: POST_CUSTOMER_LOCKINFO, data: updateResponse });
      }
      const responseData = updateResponse;

      if (responseData?.error) {
        dispatch({ type: ERROR_CUSTMER_LOCKINFO, data: updateResponse.error });
      }
    } catch (error) {}
  };
};
