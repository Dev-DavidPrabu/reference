import axios from "axios";
import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";

export const GET_PREFUND_DEBIT_REPORT = "GET_PREFUND_DEBIT_REPORT";
export const GET_PREFUND_DEBIT_DOWNLOAD_REPORT_PDF =
  "GET_PREFUND_DEBIT_DOWNLOAD_REPORT_PDF";
export const GET_PREFUND_DEBIT_DOWNLOAD_REPORT_EXCEL =
  "GET_PREFUND_DEBIT_DOWNLOAD_REPORT_EXCEL";
export const RESET__PREFUND_DEBIT_REPORT = "RESET__PREFUND_DEBIT_REPORT";
export const RESET_PREFUND_DEBIT_DOWNLOAD_REPORT_PDF =
  "RESET_PREFUND_DEBIT_DOWNLOAD_REPORT_PDF";
export const RESET_PREFUND_DEBIT_DOWNLOAD_REPORT_EXCEL =
  "RESET_PREFUND_DEBIT_DOWNLOAD_REPORT_EXCEL";

export const getPrefundDebitReport = (filterValue: any) => {
  return async (dispatch: Dispatch) => {
    let startDate = filterValue.fromDate
      ? `&fromDate=${filterValue.fromDate}`
      : `${""}`;
    let endDate = filterValue.toDate
      ? `&toDate=${filterValue.toDate}`
      : `${""}`;
    let companyName = filterValue.companyName
      ? `&companyName=${filterValue.companyName}`
      : `${""}`;
    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.PrefundDebitReport +
      `?${startDate}${endDate}${companyName}`;
    try {
      const PrefundDebitReportData = await axios
        .get(apiURL)
        .then((response) => {
          if (response) {
            return response;
          } else {
            return false;
          }
        });
      if (PrefundDebitReportData) {
        dispatch({
          type: GET_PREFUND_DEBIT_REPORT,
          data: PrefundDebitReportData.data,
        });
      }
    } catch (err) {}
  };
};

export const PrefundDebitDownloadReport = (filterValue: any, fileType: any) => {
  return async (dispatch: Dispatch) => {
    let startDate = filterValue.fromDate
      ? `&fromDate=${filterValue.fromDate}`
      : `${""}`;
    let endDate = filterValue.toDate
      ? `&toDate=${filterValue.toDate}`
      : `${""}`;
    let companyName = filterValue.companyName
      ? `&companyName=${filterValue.companyName}`
      : `${""}`;
    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.PrefundDebitReportDownload +
      `?fileType=${fileType}${startDate}${endDate}${companyName}`;
    try {
      const PrefundDebitDownloadRes = await axios
        .get(apiURL)
        .then((response) => {
          if (response) {
            return response;
          } else {
            return false;
          }
        });
      if (PrefundDebitDownloadRes) {
        if (fileType === "pdf") {
          dispatch({
            type: GET_PREFUND_DEBIT_DOWNLOAD_REPORT_PDF,
            data: PrefundDebitDownloadRes?.data,
          });
        } else {
          dispatch({
            type: GET_PREFUND_DEBIT_DOWNLOAD_REPORT_EXCEL,
            data: PrefundDebitDownloadRes?.data,
          });
        }
      }
    } catch (error) {}
  };
};

export const resetprefundDebitReport = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET__PREFUND_DEBIT_REPORT });
  };
};

export const resetprefundDebitReportPdfDownload = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_PREFUND_DEBIT_DOWNLOAD_REPORT_PDF });
  };
};

export const resetprefundDebitReportExcelDownload = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_PREFUND_DEBIT_DOWNLOAD_REPORT_EXCEL });
  };
};
