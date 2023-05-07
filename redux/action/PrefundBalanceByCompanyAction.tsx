import axios from "axios";
import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";

export const GET_PREFUND_BALANCE_BY_COMPANY_REPORT =
  "GET_PREFUND_BALANCE_BY_COMPANY_REPORT";
export const GET_PREFUND_BALANCE_BY_COMPANY_PDF_DOWNLOAD_REPORT =
  "GET_PREFUND_BALANCE_BY_COMPANY_PDF_DOWNLOAD_REPORT";
  export const GET_PREFUND_BALANCE_BY_COMPANY_EXCEL_DOWNLOAD_REPORT =
  "GET_PREFUND_BALANCE_BY_COMPANY_EXCEL_DOWNLOAD_REPORT";
export const RESET_PREFUND_BALANCE_BY_COMPANY_REPORT =
  "RESET_PREFUND_BALANCE_BY_COMPANY_REPORT";
export const RESET_PREFUND_BALANCE_BY_COMPANY_PDF_DOWNLOAD_REPORT =
  "RESET_PREFUND_BALANCE_BY_COMPANY_PDF_DOWNLOAD_REPORT";
export const RESET_PREFUND_BALANCE_BY_COMPANY_EXCEL_DOWNLOAD_REPORT =
  "RESET_PREFUND_BALANCE_BY_COMPANY_EXCEL_DOWNLOAD_REPORT";
export const getPrefundBalanceByCompany = (filterValue: any) => {
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
      ApiEndPoints.PrefundBalanceByCompany +
      `?${postingStartDate}${postingEndDate}${companyName}`;
    try {
      const PrefundBalanceByCompanyData = await axios
        .get(apiURL)
        .then((response) => {
          if (response) {
            return response;
          } else {
            return false;
          }
        });
      if (PrefundBalanceByCompanyData) {
        dispatch({
          type: GET_PREFUND_BALANCE_BY_COMPANY_REPORT,
          data: PrefundBalanceByCompanyData.data,
        });
      }
    } catch (err) {}
  };
};

export const PrefundBalanceByCompanyDownload = (
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
      ApiEndPoints.PrefundBalanceByCompanyDownload +
      `?fileType=${fileType}${postingStartDate}${postingEndDate}${companyName}`;
    try {
      const PrefundBalanceByCompanyDownloadRes = await axios
        .get(apiURL)
        .then((response) => {
          if (response) {
            return response;
          } else {
            return false;
          }
        });
      if (PrefundBalanceByCompanyDownloadRes) {
        if (fileType === "pdf") {
        dispatch({
          type: GET_PREFUND_BALANCE_BY_COMPANY_PDF_DOWNLOAD_REPORT,
          data: PrefundBalanceByCompanyDownloadRes?.data,
        });
      }else {
        dispatch({
          type: GET_PREFUND_BALANCE_BY_COMPANY_EXCEL_DOWNLOAD_REPORT,
          data: PrefundBalanceByCompanyDownloadRes?.data,
        });
    } 
  }
}catch (err) {}
};
};

export const resetprefundBalanceByCompany = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_PREFUND_BALANCE_BY_COMPANY_REPORT });
  };
};

export const resetprefundBalanceByCompanyPdfDownload = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_PREFUND_BALANCE_BY_COMPANY_PDF_DOWNLOAD_REPORT });
  };
};

export const resetprefundBalanceByCompanyExcelDownload = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_PREFUND_BALANCE_BY_COMPANY_EXCEL_DOWNLOAD_REPORT });
  };
};
