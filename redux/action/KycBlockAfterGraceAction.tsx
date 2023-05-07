import { Constants, ApiEndPoints } from "../../Constants/Constants";
import { Dispatch } from "redux";
import axios from "axios";

export const GET_KYC_BLOCK_AFTER_GRACE = "GET_KYC_BLOCK_AFTER_GRACE";
export const RESET_KYC_BLOCK_AFTER_GRACE = "RESET_KYC_BLOCK_AFTER_GRACE";

export const getKYCBlockAfterGraceRecords = (filterValue: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.getKycBlockAfterGraceList +
      `?fromDate=${filterValue.startDate}&&toDate=${filterValue.enddate}`;
    try {
      const afterGraceResponse = await axios.get(apiURL).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (afterGraceResponse) {
        dispatch({
          type: GET_KYC_BLOCK_AFTER_GRACE,
          data: afterGraceResponse.data,
        });
      }
    } catch (error) {}
  };
};

export const resetKYCBlockAfterGraceRecords = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_KYC_BLOCK_AFTER_GRACE });
  };
};
