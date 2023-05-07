import { Constants, ApiEndPoints } from "../../Constants/Constants";
import { Dispatch } from "redux";
import axios, { AxiosError } from "axios";

export const GET_PROMO_CODE_LIST = "GET_PROMO_CODE_LIST";
export const CREATE_PROMO_CODE_SETUP = "CREATE_PROMO_CODE_SETUP";
export const RESET_CREATE_PROMO_CODE_SETUP = "RESET_CREATE_PROMO_CODE_SETUP";
export const UPDATE_PROMO_CODE_SETUP = "UPDATE_PROMO_CODE_SETUP";
export const RESET_UPDATE_PROMO_CODE_SETUP = "RESET_UPDATE_PROMO_CODE_SETUP";
export const GET_PROMO_GROUP_CUSTOMERS_LIST = "GET_PROMO_GROUP_CUSTOMERS_LIST";
export const RESET_PROMO_GROUP_CUSTOMERS_LIST =
  "RESET_PROMO_GROUP_CUSTOMERS_LIST";
export const GET_PROMO_CUSTOMER_ENQUIRY_DETAILS =
  "GET_PROMO_CUSTOMER_ENQUIRY_DETAILS";
export const RESET_PROMO_CUSTOMER_ENQUIRY_DETAILS =
  "RESET_PROMO_CUSTOMER_ENQUIRY_DETAILS";

export const getPromoCodeSetupList = () => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.getPromoCodeList;
    try {
      const response = await axios.get(apiURL).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: GET_PROMO_CODE_LIST, data: response.data });
      }
    } catch (error) { }
  };
};

export const resetPromoCreateMessage = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_CREATE_PROMO_CODE_SETUP });
  };
};

export const createPromoCodeData = (data: any) => {
  return async (dispatch: Dispatch) => {
    try {
      const apiURL = Constants.BaseURL + ApiEndPoints.createPromoCodeSetup;
      const response = await axios.post(apiURL, data).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: CREATE_PROMO_CODE_SETUP, data: response });
        if (response.data) {
        }
      }
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 400) {
        dispatch({ type: CREATE_PROMO_CODE_SETUP, data: err?.response?.data });
      }
    }
  };
};

export const resetPromoUpdateMessage = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_UPDATE_PROMO_CODE_SETUP });
  };
};

export const updatePromoCodeData = (data: any) => {
  return async (dispatch: Dispatch) => {
    try {
      const apiURL = Constants.BaseURL + ApiEndPoints.updatePromoCodeSetup;
      const response = await axios.post(apiURL, data).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: UPDATE_PROMO_CODE_SETUP, data: response });
      }
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 400) {
        dispatch({ type: UPDATE_PROMO_CODE_SETUP, data: err?.response?.data });
      }
    }
  };
};

export const deletePromoCodeSetup = (id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const apiURL = Constants.BaseURL + ApiEndPoints.deletePromoCodeSetup + id;
      const response = await axios.delete(apiURL).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (response) {
        window.location.reload();
      }
    } catch (error) { }
  };
};

export const resetCustomerPromoDetails = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_PROMO_CUSTOMER_ENQUIRY_DETAILS });
  };
};

export const getKYCCustomerPromoDetails = (customerID: string) => {
  return async (dispatch: Dispatch) => {
    const apiURL =
      Constants.BaseURL + ApiEndPoints.getKYCCustomerEnquiry + customerID;
    try {
      const response = await axios.get(apiURL).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({
          type: GET_PROMO_CUSTOMER_ENQUIRY_DETAILS,
          data: response.data,
        });
      }
    } catch (error) { }
  };
};

export const resetPromoCustomersList = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_PROMO_GROUP_CUSTOMERS_LIST });
  };
};

export const getPromoGroupCustomersList = (groupCode: String) => {
  return async (dispatch: Dispatch) => {
    const apiURL =
      Constants.BaseURL + ApiEndPoints.getAllTargetGroupByCustomers + groupCode;
    try {
      const response = await axios.get(apiURL).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({
          type: GET_PROMO_GROUP_CUSTOMERS_LIST,
          data: response.data,
        });
      }
    } catch (error) { }
  };
};
