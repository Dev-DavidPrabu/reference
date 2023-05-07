import { Dispatch } from "redux";
import { Constants, ApiEndPoints } from "../../Constants/Constants";
import axios from "axios";

export const GET_ALL_PREFUND_DATA = "GET_ALL_PREFUND_DATA";
export const ADD_NEW_TRANSCATION_DATA = "ADD_NEW_TRANSCATION_DATA";
export const RESET_CREATE_INO = "RESET_CREATE_INO";
export const SELECTED_TRANSCATION_INFO = "SELECTED_TRANSCATION_INFO";
export const GET_CURRENT_BALANCE_OF_THE_COMPANY =
  "GET_CURRENT_BALANCE_OF_THE_COMPANY";
export const GET_COMPANY_USER = "GET_COMPANY_USER";
export const ADD_NEW_USER_COMPANY = "ADD_NEW_USER_COMPANY";
export const DELETE_COMPANY_USER = "DELETE_COMPANY_USER";
export const RESET_CREATE_USER_INFO = "RESET_CREATE_USER_INFO";
export const RESET_API_GATE_WAY_LOGIN_INFO = "RESET_API_GATE_WAY_LOGIN_INFO";
export const PROOF_UPLOADED = "PROOF_UPLOADED";
export const POST_PAYROLL_PREFUND = "POST_PAYROLL_PREFUND";
export const GET_BANKNAME = "GET_BANKNAME";

export const getAllPrefundData = () => {
  return async (dispatch: Dispatch) => {
    let userData = JSON.parse(localStorage.getItem("userData") || "{}");
    const apiURL =
      Constants.BaseURL + ApiEndPoints.prefundListBasedOnId + userData.userId;
    const response = await axios.get(apiURL).then((response) => {
      return response;
    });
    const responseData = response;
    dispatch({ type: GET_ALL_PREFUND_DATA, data: responseData.data });
  };
};
export const postNewTransaction = (apiBody: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.prefundTransactionSave;
    // delete apiBody["transactionDate"];
    const response = await axios.post(apiURL, apiBody).then((response) => {
      return response?.data;
    });
    if (response)
      dispatch({ type: ADD_NEW_TRANSCATION_DATA, data: response || [] });
  };
};

export const uploadProofFile = (fileData: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.uploadPrefundProof;

    var formData = new FormData();
    formData.append("receiptDocument", fileData);
    formData.append("receiptContent", fileData.name);
    const fileUploadeResponse = await axios
      .post(apiURL, formData)
      .then((response) => {
        return response?.data;
      });
    if (fileUploadeResponse)
      dispatch({ type: PROOF_UPLOADED, data: fileUploadeResponse || [] });
  };
};

export const clearCreateTransitionInfo = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_CREATE_INO });
  };
};

export const getSelectedtTransactionInfo = (transactionId: string) => {
  return async (dispatch: Dispatch) => {
    const apiURL =
      Constants.BaseURL + ApiEndPoints.prefundTransactionInfo + transactionId;
    const response = await fetch(apiURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();
    dispatch({ type: SELECTED_TRANSCATION_INFO, data: responseData.data });
  };
};

export const getCurrentBalanceOftheCompany = (accountId: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.prefundCompanyGetCompanyBalance +
      accountId;
    try {
      const responseData = await axios.get(apiURL).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (responseData) {
        dispatch({
          type: GET_CURRENT_BALANCE_OF_THE_COMPANY,
          data: responseData.data,
        });
      }
    } catch (error) {}
  };
};

export const getBankName = () => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.bankName;
    try {
      const responseData = await axios.get(apiURL).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      console.log(responseData, "responseDataresponseDataresponseData");
      if (responseData) {
        dispatch({
          type: GET_BANKNAME,
          data: responseData.data,
        });
      }
    } catch (error) {}
  };
};

export const getUserListBasedOnCompany = () => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.prefundCompanyUserList;
    try {
      const getResponse = await axios.get(apiURL).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (getResponse) {
        dispatch({ type: GET_COMPANY_USER, data: getResponse.data });
      }
    } catch (error) {}
  };
};

export const addNewUserToCompany = (apiBody: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.prefundCompanyUserSave;
    try {
      const getResponse = await axios.post(apiURL, apiBody).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (getResponse) {
        dispatch({ type: ADD_NEW_USER_COMPANY, data: getResponse.data });
      }
    } catch (error) {}
  };
};

export const clearCreateUserInformation = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_CREATE_USER_INFO });
  };
};

export const deleteSelectedCompanyUser = (userId: string) => {
  return async (dispatch: Dispatch) => {
    const apiURL =
      Constants.BaseURL + ApiEndPoints.prefundCompanyUserDelete + userId;
    const response = await fetch(apiURL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();
    dispatch({ type: DELETE_COMPANY_USER, data: responseData.data });
  };
};

export const userLogoutForApiGateWay = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_API_GATE_WAY_LOGIN_INFO });
  };
};

export const PostPrefund = (apiBody: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.PayrollPrefundPost;
    try {
      const PayrollPostResponse = await axios
        .post(apiURL, apiBody)
        .then((response) => {
          if (response) {
            return response;
          } else {
            return false;
          }
        });
      if (PayrollPostResponse) {
        dispatch({
          type: POST_PAYROLL_PREFUND,
          data: PayrollPostResponse.data,
        });
      }
    } catch (error) {}
  };
};
