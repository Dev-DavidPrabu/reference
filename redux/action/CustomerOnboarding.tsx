import axios from "axios";
import { Dispatch } from "redux";
import {
  ApiEndPoints,
  Constants,
} from "../../Constants/Constants";
import { CustomerOnboardingModel } from "../../models/CustomerOnboardingModel";

export const POST_NEW_CUSTOMER_DATA = "POST_NEW_CUSTOMER_DATA";
export const GET_ALL_CUSTOMER_DATA = "GET_ALL_CUSTOMER_DATA";
export const RESET_CUSTOMER_USER_INFO = "RESET_CUSTOMER_USER_INFO";
export const SELETECTED_PREFUND_USER_INFO = "SELETECTED_PREFUND_USER_INFO";
export const UPDATE_CUSTOMER_DATA = "UPDATE_CUSTOMER_DATA";

export const addNewCustomer = (apiBody: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL =Constants.BaseURL+ApiEndPoints.addNewUserToTheCompany;
    delete apiBody["id"];
    const response = await axios.post(apiURL, apiBody).then((response) => {
      return response.data;
    });
    dispatch({ type: POST_NEW_CUSTOMER_DATA, data: response });
  };
};

export const updateCustomerData = (apiBody: CustomerOnboardingModel) => {
  return async (dispatch: Dispatch) => {
    const apiURL =Constants.BaseURL+ApiEndPoints.addNewUserToTheCompany;
    const response = await fetch(apiURL, {
      method: "POST",
      body: JSON.stringify(apiBody),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    dispatch({ type: POST_NEW_CUSTOMER_DATA, data: data });
  };
};

export const getCustomerData = (companyId: string) => {
  return async (dispatch: Dispatch) => {
    const apiURL =Constants.BaseURL+ApiEndPoints.customerListBasedOnCompany+companyId;
    const response = await axios.get(apiURL).then((response) => {
      return response.data;
    });
    const responseData = response;
    dispatch({ type: GET_ALL_CUSTOMER_DATA, data: responseData.data });
  };
};

export const clearNewCustInfo = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_CUSTOMER_USER_INFO });
  };
};

export const getSelectedPrefundUser = (userId: string) => {
  return async (dispatch: Dispatch) => {
    const apiURL =Constants.BaseURL+ApiEndPoints.slectedCustomerInfo+ userId;
    const response = await axios.get(apiURL).then((response) => {
      return response.data;
    });
    dispatch({ type: SELETECTED_PREFUND_USER_INFO, data: response });
  };
};

export const updateUserToCustomer = (apiBody: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL =Constants.BaseURL+ApiEndPoints.updateSlectedCustomerInfo;
    const response = await axios.post(apiURL, apiBody).then((response) => {
      return response.data;
    });
    dispatch({ type: UPDATE_CUSTOMER_DATA, data: response });
  };
};
