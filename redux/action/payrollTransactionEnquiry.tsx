import { ApiEndPoints, Constants } from "../../Constants/Constants";
import { Dispatch } from "redux";
import { PayrollTransactionEnquiryModel } from "../../models/PayrollEnquiryModels";

export const GET_ALL_PAYROLLTRANSACTIONENQUIRY =
  "GET_ALL_PAYROLLTRANSACTIONENQUIRY";

export const getPayrollTransactionEnquiry = (
  prefundTransactionQuery: PayrollTransactionEnquiryModel
) => {
  return async (dispatch: Dispatch) => {
    let user: any = localStorage.getItem("userInfo");
    user = JSON.parse(user);
    const apiURL =
      Constants.BaseURL + ApiEndPoints.prefundTransactionInquiryList;
    const response = await fetch(apiURL, {
      method: "POST",
      body: JSON.stringify(prefundTransactionQuery),

      headers: {
        "Content-Type": "application/json",

        Authorization: "Bearer " + user?.idToken,
        "x-session-id": user?.sessionId,
      },
    });
    const data = await response.json();
    dispatch({ type: GET_ALL_PAYROLLTRANSACTIONENQUIRY, data: data });
  };
};

export const getPayrollMyTransactionEnquiry = (
  prefundTransactionQuery: PayrollTransactionEnquiryModel
) => {
  return async (dispatch: Dispatch) => {
    const apiURL =
      Constants.BaseURL + ApiEndPoints.prefundTransactionInquiryListForAll;
    const response = await fetch(apiURL, {
      method: "POST",
      body: JSON.stringify(prefundTransactionQuery),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    dispatch({ type: GET_ALL_PAYROLLTRANSACTIONENQUIRY, data: data });
  };
};
