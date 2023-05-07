import axios from "axios";
import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";

export const GET_PAYROLL_TXN_BY_COMPANY = "GET_PAYROLL_TXN_BY_COMPANY";
export const GET_PAYROLL_TXN_BY_COMPANY_DOWNLOAD_PDF =
  "GET_PAYROLL_TXN_BY_COMPANY_DOWNLOAD_PDF";
export const GET_PAYROLL_TXN_BY_COMPANY_DOWNLOAD_EXCEL =
  "GET_PAYROLL_TXN_BY_COMPANY_DOWNLOAD_EXCEL";
export const RESET_PAYROLL_TXN_BY_COMPANY = "RESET_PAYROLL_TXN_BY_COMPANY";
export const RESET_PAYROLL_TXN_BY_COMPANY_DOWNLOAD_PDF =
  "RESET_PAYROLL_TXN_BY_COMPANY_DOWNLOAD_PDF";
export const RESET_PAYROLL_TXN_BY_COMPANY_DOWNLOAD_EXCEL =
  "RESET_PAYROLL_TXN_BY_COMPANY_DOWNLOAD_EXCEL";

export const getPayrollTxnByCompany = (filterValue: any) => {
  return async (dispatch: Dispatch) => {
    let postingStartDate = filterValue.postingStartDate
      ? `&postingStartDate=${filterValue.postingStartDate}`
      : `${""}`;
    let postingEndDate = filterValue.postingEndDate
      ? `&postingEndDate=${filterValue.postingEndDate}`
      : `${""}`;
    let companyName = filterValue.companyName
      ? `&companyName=${filterValue.companyName}`
      : `${""}`;
    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.PayrollTxnByCompany +
      `?${postingStartDate}${postingEndDate}${companyName}`;
    try {
      const PayrollTxnByCompanyData = await axios
        .get(apiURL)
        .then((response) => {
          if (response) {
            return response;
          } else {
            return false;
          }
        });
      if (PayrollTxnByCompanyData) {
        dispatch({
          type: GET_PAYROLL_TXN_BY_COMPANY,
          data: PayrollTxnByCompanyData.data,
        });
      }
    } catch (err) {}
  };
};

export const PayrollTxnByCompanyDownload = (
  filterValue: any,
  fileType: any
) => {
  return async (dispatch: Dispatch) => {
    let postingStartDate = filterValue.postingStartDate
      ? `&postingStartDate=${filterValue.postingStartDate}`
      : `${""}`;
    let postingEndDate = filterValue.postingEndDate
      ? `&postingEndDate=${filterValue.postingEndDate}`
      : `${""}`;
    let companyName = filterValue.companyName
      ? `&companyName=${filterValue.companyName}`
      : `${""}`;
    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.PayrollTxnByCompanyDownload +
      `?fileType=${fileType}${postingStartDate}${postingEndDate}${companyName}`;
    try {
      const PayrollTxnByCompanyDownloadRes = await axios
        .get(apiURL)
        .then((response) => {
          if (response) {
            return response;
          } else {
            return false;
          }
        });
      if (PayrollTxnByCompanyDownloadRes) {
        if (fileType === "pdf") {
          dispatch({
            type: GET_PAYROLL_TXN_BY_COMPANY_DOWNLOAD_PDF,
            data: PayrollTxnByCompanyDownloadRes?.data,
          });
        } else {
          dispatch({
            type: GET_PAYROLL_TXN_BY_COMPANY_DOWNLOAD_EXCEL,
            data: PayrollTxnByCompanyDownloadRes?.data,
          });
        }
      }
    } catch (error) {}
  };
};

export const resetpayrollTxnByCompany = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_PAYROLL_TXN_BY_COMPANY });
  };
};

export const resetpayrollTxnByCompanyPdfDownload = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_PAYROLL_TXN_BY_COMPANY_DOWNLOAD_PDF });
  };
};

export const resetpayrollTxnByCompanyExcelDownload = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_PAYROLL_TXN_BY_COMPANY_DOWNLOAD_EXCEL });
  };
};
