import { Constants, ApiEndPoints } from "../../Constants/Constants";
import { Dispatch } from "redux";
import axios from "axios";

export const GET_TARGET_GROUP_LIST = "GET_TARGET_GROUP_LIST";
export const CREATE_TARGET_GROUP_BY_CUSTOMERS =
  "CREATE_TARGET_GROUP_BY_CUSTOMERS";
export const RESET_CREATE_TARGET_GROUP_BY_CUSTOMERS =
  "RESET_CREATE_TARGET_GROUP_BY_CUSTOMERS";
export const GET_TARGET_GROUP_BY_CUSTOMERS_LIST =
  "GET_TARGET_GROUP_BY_CUSTOMERS_LIST";
export const RESET_TARGET_GROUP_BY_CUSTOMERS_LIST =
  "RESET_TARGET_GROUP_BY_CUSTOMERS_LIST";
export const EDIT_TARGET_GROUP_BY_CUSTOMERS = "EDIT_TARGET_GROUP_BY_CUSTOMERS";
export const RESET_EDIT_TARGET_GROUP_BY_CUSTOMERS =
  "RESET_EDIT_TARGET_GROUP_BY_CUSTOMERS";
export const GET_NATIONALITY_REFERENCE_DATA = "GET_NATIONALITY_REFERENCE_DATA";
export const GET_REMIT_COUNTRY_REFERENCE_DATA =
  "GET_REMIT_COUNTRY_REFERENCE_DATA";
export const GET_REMIT_PAYMENT_METHOD_REFERENCE_DATA =
  "GET_REMIT_PAYMENT_METHOD_REFERENCE_DATA";
export const GET_GROUP_CUSTOMER_ENQUIRY_DETAILS =
  "GET_GROUP_CUSTOMER_ENQUIRY_DETAILS";
export const RESET_GROUP_CUSTOMER_ENQUIRY_DETAILS =
  "RESET_GROUP_CUSTOMER_ENQUIRY_DETAILS";

export const getTargetGroupList = () => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.getAllTargetGroupList;
    try {
      const response = await axios.get(apiURL).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: GET_TARGET_GROUP_LIST, data: response.data });
      }
    } catch (error) {}
  };
};

export const resetTargetGroupByCustomersCreateMessage = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_CREATE_TARGET_GROUP_BY_CUSTOMERS });
  };
};

export const createTargetGroupByCustomersData = (createData: any) => {
  return async (dispatch: Dispatch) => {
    try {
      const apiURL =
        Constants.BaseURL + ApiEndPoints.createTargetGroupByCustomers;
      const response = await axios.post(apiURL, createData).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: CREATE_TARGET_GROUP_BY_CUSTOMERS, data: response });
      }
    } catch (error) {}
  };
};

export const resetTargetGroupByCustomersList = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_TARGET_GROUP_BY_CUSTOMERS_LIST });
  };
};

export const getTargetGroupByCustomersList = (groupCode: String) => {
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
          type: GET_TARGET_GROUP_BY_CUSTOMERS_LIST,
          data: response.data,
        });
      }
    } catch (error) {}
  };
};

export const resetTargetGroupByCustomersEditMessage = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_EDIT_TARGET_GROUP_BY_CUSTOMERS });
  };
};

export const updateTargetGroupByCustomers = (EditData: any) => {
  return async (dispatch: Dispatch) => {
    try {
      const apiURL =
        Constants.BaseURL + ApiEndPoints.updateTargetGroupByCustomers;
      const response = await axios.post(apiURL, EditData).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: EDIT_TARGET_GROUP_BY_CUSTOMERS, data: response });
        if (response.data) {
          window.history.back();
        }
      }
    } catch (error) {}
  };
};

export const deleteTargetGroup = (id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const apiURL = Constants.BaseURL + ApiEndPoints.deleteTargetGroup + id;
      const response = await axios.post(apiURL).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (response) {
        window.location.reload();
      }
    } catch (error) {}
  };
};

export const deleteTargetGroupCustomers = (id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const apiURL =
        Constants.BaseURL + ApiEndPoints.deleteTargetGroupByCustomers + id;
      const response = await axios.post(apiURL).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (response) {
        window.location.reload();
      }
    } catch (error) {}
  };
};

export const getNationalityReferenceData = (referenceCategory: string) => {
  return async (dispatch: Dispatch) => {
    const apiURL =
      Constants.BaseURL + ApiEndPoints.referenceDataList + referenceCategory;
    try {
      const response = await axios.get(apiURL).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: GET_NATIONALITY_REFERENCE_DATA, data: response.data });
      }
    } catch (error) {}
  };
};

export const getRemitCountryReferenceData = (referenceCategory: string) => {
  return async (dispatch: Dispatch) => {
    const apiURL =
      Constants.BaseURL + ApiEndPoints.referenceDataList + referenceCategory;
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
          type: GET_REMIT_COUNTRY_REFERENCE_DATA,
          data: response.data,
        });
      }
    } catch (error) {}
  };
};

export const getPaymentMethodReferenceData = (referenceCategory: string) => {
  return async (dispatch: Dispatch) => {
    const apiURL =
      Constants.BaseURL + ApiEndPoints.referenceDataList + referenceCategory;
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
          type: GET_REMIT_PAYMENT_METHOD_REFERENCE_DATA,
          data: response.data,
        });
      }
    } catch (error) {}
  };
};

export const resetCustomerGroupDetails = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_GROUP_CUSTOMER_ENQUIRY_DETAILS });
  };
};

export const getKYCCustomerGroupDetails = (customerID: string) => {
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
          type: GET_GROUP_CUSTOMER_ENQUIRY_DETAILS,
          data: response.data,
        });
      }
    } catch (error) {}
  };
};
