import { Constants, ApiEndPoints } from "../../Constants/Constants";
import { Dispatch } from "redux";
import axios from "axios";
import { PayrollCompanyMaintenanceObject } from "../../models/PayrollCompanyMaintenanceModel";

export const GET_ALL_COMPANY_DATA = "GET_ALL_COMPANY_DATA";
export const POST_NEW_PAYROLL_COMPANY = "POST_NEW_PAYROLL_COMPANY";
export const UPDATE_PAYROLL_COMPANY = "UPDATE_PAYROLL_COMPANY";
export const DELETE_PAYROLL_COMPANY = "DELETE_PAYROLL_COMPANY";
export const GET_SELECTED_COMPANY_DATA = "GET_SELECTED_COMPANY_DATA";
export const RESET_COMAPNY_INFO = "RESET_COMAPNY_INFO";
export const RESET_CREATED_COMAPNY_INFO = "RESET_CREATED_COMAPNY_INFO";
export const USER_DATA = "GET_USER";
export const RESET_DELETE_COMAPNY_INFO = "RESET_DELETE_COMAPNY_INFO";
export const GET_TRANSACTION_OF_COMPANY = "GET_TRANSACTION_OF_COMPANY";
export const RESET_TRANSACTION_OF_COMPANY = "RESET_TRANSACTION_OF_COMPANY";
export const GETALLBRANCHDATAWITHCODE = "GETALLBRANCHDATAWITHCODE";

export const getAllCompanyData = (companyData: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.getAllCompanyList;
    try {
      const response = await axios.get(apiURL).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (response && companyData === "userScreen") {
        dispatch({ type: USER_DATA, data: response.data });
      }
      if (response && companyData === "comapanyMainatnce") {
        dispatch({ type: GET_ALL_COMPANY_DATA, data: response.data });
      }
    } catch (error) {}
  };
};

export const getAllBranchcodeData = () => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.getAllBranchCode;
    axios.get(apiURL).then((response) => {
      dispatch({ type: GETALLBRANCHDATAWITHCODE, data: response.data });
    });
  };
};

export const getSelectedCompanyData = (id: string) => {
  return async (dispatch: Dispatch) => {
    const apiURL =
      Constants.BaseURL + ApiEndPoints.getAllCompanyList + "/" + id;
    try {
      const responseData = await axios.get(apiURL).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (responseData) {
        dispatch({ type: GET_SELECTED_COMPANY_DATA, data: responseData.data });
      }
    } catch (error) {}
  };
};

export const getCompanyDatabyId = (apiBody: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.getCompanytransactions +
      `?companyId=${apiBody.companyId}&transactionStartDate=${
        apiBody.startDate === ""
          ? apiBody.startDate
          : apiBody.startDate + "T00:00:00"
      }&transactionEndDate=${
        apiBody.endDate === "" ? apiBody.endDate : apiBody.endDate + "T11:59:59"
      }`;
    try {
      const responseData = await axios.get(apiURL).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (responseData) {
        dispatch({ type: GET_TRANSACTION_OF_COMPANY, data: responseData.data });
      }
    } catch (error) {}
  };
};

export const postNewPayrollCompanyData = (apiBody: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.addNewCompany;

    try {
      delete apiBody["id"];
      delete apiBody["companyAccountid"];
      const response = await axios.post(apiURL, apiBody).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: POST_NEW_PAYROLL_COMPANY, data: response });
      }
    } catch (error) {}
  };
};

export const updatePayrollCompanyData = (
  apiBody: PayrollCompanyMaintenanceObject
) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.addNewCompany;
    const response = await axios.post(apiURL, apiBody).then((response) => {
      return response.data;
    });
    dispatch({ type: UPDATE_PAYROLL_COMPANY, data: response });
  };
};

export const deletePayrollCompanyData = (companyRegistrationNo: string) => {
  return async (dispatch: Dispatch) => {
    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.deleteSelectedCompany +
      companyRegistrationNo;
    const response = await axios.post(apiURL).then((response) => {
      return response.data;
    });
    dispatch({ type: DELETE_PAYROLL_COMPANY, data: response });
  };
};

export const resetTranscationData = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_TRANSACTION_OF_COMPANY });
  };
};

export const restCompanyData = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_COMAPNY_INFO });
  };
};
export const restDeleteCompanyData = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_DELETE_COMAPNY_INFO });
  };
};

export const restCreatedCompanyData = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_CREATED_COMAPNY_INFO });
  };
};
