import { ApiEndPoints, Constants } from "../../Constants/Constants";
import { Dispatch } from "redux";
import { PayrollAccountEnquiryModel } from "../../models/PayrollEnquiryModels";
import axios from "axios";

export const GET_ALL_PAYROLLACCOUNTENQUIRY = "GET_ALL_PAYROLLACCOUNTENQUIRY";

export const getPayrollAccountEnquiry = (
  prefundAccountQuery: PayrollAccountEnquiryModel
) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.payrollAccountInquiryList;
    try {
      const data = await axios
        .post(apiURL, prefundAccountQuery)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (data) {
        dispatch({ type: GET_ALL_PAYROLLACCOUNTENQUIRY, data: data });
      }
    } catch (error) {}
  };
};
