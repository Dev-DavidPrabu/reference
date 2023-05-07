import { Constants, ApiEndPoints } from "../../Constants/Constants";
import { Dispatch } from "redux";
import axios from "axios";

export const GET_KYC_EXPIRY_DOWNGRADE = "GET_KYC_EXPIRY_DOWNGRADE";
export const RESET_KYC_EXPIRY_DOWNGRADE = "RESET_KYC_EXPIRY_DOWNGRADE";

export const getKYCExpiryDowngradeRecords = (filterValue: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.getKycExpiryDownGradeList +
      `?fromDate=${filterValue.startDate}&&toDate=${filterValue.enddate}`;
    try {
      const expiryDowngradeResponse = await axios
        .get(apiURL)
        .then((response) => {
          if (response) {
            return response;
          } else {
            return false;
          }
        });
      if (expiryDowngradeResponse) {
        dispatch({
          type: GET_KYC_EXPIRY_DOWNGRADE,
          data: expiryDowngradeResponse.data,
        });
      }
    } catch (error) {}
  };
};

export const resetKYCExpiryDowngradeRecords = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_KYC_EXPIRY_DOWNGRADE });
  };
};
