import { Constants, ApiEndPoints } from "../../Constants/Constants";
import { Dispatch } from "redux";
import axios from "axios";

export const GET_KYC_PENDING_CUSTOMER = "GET_KYC_PENDING_CUSTOMER";
export const GET_KYC_CUSTOMER_DETAILS = "GET_KYC_CUSTOMER_DETAILS";
export const RESET_KYC_CUSTOMER_DETAILS = "RESET_KYC_CUSTOMER_DETAILS";

export const getKYCPendingCustomerList = () => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.getKYCPendingCustomer;
    try {
      const response = await axios.get(apiURL).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: GET_KYC_PENDING_CUSTOMER, data: response.data });
      }
    } catch (error) {}
  };
};

export const resetCustomerDetails = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_KYC_CUSTOMER_DETAILS });
  };
};

export const getKYCCustomerDetails = (customerID: string) => {
  return async (dispatch: Dispatch) => {
    const apiURL =
      Constants.BaseURL + ApiEndPoints.getKYCCustomerDetail + customerID;
    try {
      const response = await axios.get(apiURL).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: GET_KYC_CUSTOMER_DETAILS, data: response.data });
      }
    } catch (error) {}
  };
};
