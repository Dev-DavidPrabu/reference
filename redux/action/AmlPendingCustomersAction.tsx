import { ApiEndPoints, Constants } from "../../Constants/Constants";
import { Dispatch } from "redux";
import axios from "axios";

export const GET_AML_PENDING_CUSTOMERS_LIST = "GET_AML_PENDING_CUSTOMERS_LIST";
export const GET_AML_CUSTOMER_INFO = "GET_AML_CUSTOMER_INFO";
export const APPROVE_REJECT_STATUS = "APPROVE_REJECT_STATUS";
export const RESET_APPROVE_REJECT_STATUS = "RESET_APPROVE_REJECT_STATUS";

export const getAmlPendingCustomersList = (statusCode: string) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.amlPendingCustomersList;
    try {
      const response = await axios
        .get(apiURL, {
          params: {
            pageNo: 0,
            pageSize: 500,
            statusCode: statusCode,
          },
        })
        .then((response) => {
          if (response) {
            return response;
          } else {
            return false;
          }
        });
      if (response) {
        dispatch({ type: GET_AML_PENDING_CUSTOMERS_LIST, data: response.data });
      }
    } catch (error) {}
  };
};

export const getAmlCustomersInfo = (customerId: string) => {
  return async (dispatch: Dispatch) => {
    const apiURL =
      Constants.BaseURL + ApiEndPoints.amlCustomersInfo + customerId;
    try {
      const response = await axios
        .get(apiURL, {
          params: {
            pageNo: 0,
            pageSize: 500,
          },
        })
        .then((response) => {
          if (response) {
            return response;
          } else {
            return false;
          }
        });
      if (response) {
        dispatch({ type: GET_AML_CUSTOMER_INFO, data: response.data });
      }
    } catch (error) {}
  };
};

export const resetAppproveRejectStatus = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_APPROVE_REJECT_STATUS });
  };
};

export const approveRejectStatus = (
  customerId: string,
  status: string,
  customerRecord: any,
  match: any
) => {
  return async (dispatch: Dispatch) => {
    try {
      const apiURL =
        Constants.BaseURL + ApiEndPoints.amlStatusUpdate + customerId;
      let body;
      if (customerRecord) {
        body = customerRecord;
      } else {
        body = null;
      }
      const response = await axios
        .post(apiURL, body, {
          params: {
            status: status,
            confirmMatch: match,
          },
        })
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });

      if (response) {
        dispatch({ type: APPROVE_REJECT_STATUS, data: response });
        if (response.data) {
          window.history.back();
        }
      }
    } catch (error) {}
  };
};
