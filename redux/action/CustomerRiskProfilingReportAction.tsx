import axios from "axios";
import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";

export const GET_CUSTOMER_RISK_PROFILING = "GET_CUSTOMER_RISK_PROFILING";
export const GET_CUSTOMER_RISK_PROFILING_DOWNLOAD_PDF =
  "GET_CUSTOMER_RISK_PROFILING_DOWNLOAD_PDF";
export const GET_CUSTOMER_RISK_PROFILING_DOWNLOAD_EXCEL =
  "GET_CUSTOMER_RISK_PROFILING_DOWNLOAD_EXCEL";
export const RESET_CUSTOMER_RISK_PROFILING = "RESET_CUSTOMER_RISK_PROFILING";
export const RESET_CUSTOMER_RISK_PROFILING_DOWNLOAD_PDF =
  "RESET_CUSTOMER_RISK_PROFILING_DOWNLOAD_PDF";
export const RESET_CUSTOMER_RISK_PROFILING_DOWNLOAD_EXCEL =
  "RESET_CUSTOMER_RISK_PROFILING_DOWNLOAD_EXCEL";

export const getCustomerRiskProfiling = (filterValue: any) => {
  return async (dispatch: Dispatch) => {
    let fromDate = filterValue.startDate
      ? `&fromDate=${filterValue.startDate}`
      : `${""}`;
    let toDate = filterValue.endDate
      ? `&toDate=${filterValue.endDate}`
      : `${""}`;
    let mobileNumber = filterValue.mobileNumber
      ? `&mobileNumber=${filterValue.mobileNumber}`
      : `${""}`;
    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.CustomerRiskProfilingReport +
      `?${fromDate}${toDate}` +
      mobileNumber;
    try {
      const CustomerRiskResponse = await axios
        .get(apiURL)
        .then((response: any) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (CustomerRiskResponse) {
        dispatch({
          type: GET_CUSTOMER_RISK_PROFILING,
          data: CustomerRiskResponse,
        });
      }
    } catch (err) {}
  };
};

export const getCustomerRiskDownload = (filterValue: any, fileType: any) => {
  return async (dispatch: Dispatch) => {
    let fromDate = filterValue.startDate
      ? `&fromDate=${filterValue.startDate}`
      : `${""}`;
    let toDate = filterValue.endDate
      ? `&toDate=${filterValue.endDate}`
      : `${""}`;
    let mobileNumber = filterValue.mobileNumber
      ? `&mobileNumber=${filterValue.mobileNumber}`
      : `${""}`;
    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.CustomerRiskProfilingReportDownload +
      `?fileType=${fileType}${fromDate}${toDate}` +
      mobileNumber;
    try {
      const CustomerRiskDownload = await axios
        .get(apiURL)
        .then((response: any) => {
          if (response) {
            return response;
          } else {
            return false;
          }
        });
      if (CustomerRiskDownload) {
        if (fileType === "pdf") {
          dispatch({
            type: GET_CUSTOMER_RISK_PROFILING_DOWNLOAD_PDF,
            data: CustomerRiskDownload?.data,
          });
        } else {
          dispatch({
            type: GET_CUSTOMER_RISK_PROFILING_DOWNLOAD_EXCEL,
            data: CustomerRiskDownload?.data,
          });
        }
      }
    } catch (err) {}
  };
};

export const ResetCustomerRiskProfiling = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_CUSTOMER_RISK_PROFILING });
  };
};
export const ResetCustomerRiskProfilingPdfDownload = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_CUSTOMER_RISK_PROFILING_DOWNLOAD_PDF });
  };
};

export const ResetCustomerRiskProfilingExcelDownload = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_CUSTOMER_RISK_PROFILING_DOWNLOAD_EXCEL });
  };
};
