import axios from "axios";
import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";

export const GET_PREFUND_AMOUNT_REPORT = "GET_PREFUND_AMOUNT_REPORT";
export const GET_PREFUND_AMOUNT_DOWNLOAD_REPORT_PDF =
  "GET_PREFUND_AMOUNT_DOWNLOAD_REPORT_PDF";
export const GET_PREFUND_AMOUNT_DOWNLOAD_REPORT_EXCEL =
  "GET_PREFUND_AMOUNT_DOWNLOAD_REPORT_EXCEL";
export const RESET__PREFUND_AMOUNT_REPORT = "RESET__PREFUND_AMOUNT_REPORT";
export const RESET_PREFUND_AMOUNT_DOWNLOAD_REPORT_PDF =
  "RESET_PREFUND_AMOUNT_DOWNLOAD_REPORT_PDF";
export const RESET_PREFUND_AMOUNT_DOWNLOAD_REPORT_EXCEL =
  "RESET_PREFUND_AMOUNT_DOWNLOAD_REPORT_EXCEL";

export const getPrefundAmountReport = (filterValue: any) => {
  return async (dispatch: Dispatch) => {
    let transactionStartDate = filterValue.transactionStartDate
      ? `&transactionStartDate=${filterValue.transactionStartDate}`
      : `${""}`;
    let transactionEndDate = filterValue.transactionEndDate
      ? `&transactionEndDate=${filterValue.transactionEndDate}`
      : `${""}`;
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
      ApiEndPoints.PrefundAmountReport +
      `?${transactionStartDate}${transactionEndDate}${postingStartDate}${postingEndDate}${companyName}`;
    try {
      const PrefundAmountReportData = await axios
        .get(apiURL)
        .then((response) => {
          if (response) {
            return response;
          } else {
            return false;
          }
        });
      if (PrefundAmountReportData) {
        dispatch({
          type: GET_PREFUND_AMOUNT_REPORT,
          data: PrefundAmountReportData.data,
        });
      }
    } catch (err) {}
  };
};

export const PrefundAmountDownloadReport = (
  filterValue: any,
  fileType: any
) => {
  return async (dispatch: Dispatch) => {
    let transactionStartDate = filterValue.transactionStartDate
      ? `&transactionStartDate=${filterValue.transactionStartDate}`
      : `${""}`;
    let transactionEndDate = filterValue.transactionEndDate
      ? `&transactionEndDate=${filterValue.transactionEndDate}`
      : `${""}`;
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
      ApiEndPoints.PrefundAmountDownloadReport +
      `?fileType=${fileType}${transactionStartDate}${transactionEndDate}${postingStartDate}${postingEndDate}${companyName}`;
    try {
      const PrefundAmountDownloadRes = await axios
        .get(apiURL)
        .then((response) => {
          if (response) {
            return response;
          } else {
            return false;
          }
        });
      if (PrefundAmountDownloadRes) {
        if (fileType === "pdf") {
          dispatch({
            type: GET_PREFUND_AMOUNT_DOWNLOAD_REPORT_PDF,
            data: PrefundAmountDownloadRes?.data,
          });
        } else {
          dispatch({
            type: GET_PREFUND_AMOUNT_DOWNLOAD_REPORT_EXCEL,
            data: PrefundAmountDownloadRes?.data,
          });
        }
      }
    } catch (error) {}
  };
};

export const resetprefundAmountReport = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET__PREFUND_AMOUNT_REPORT });
  };
};

export const resetprefundAmountReportPdfDownload = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_PREFUND_AMOUNT_DOWNLOAD_REPORT_PDF });
  };
};

export const resetprefundAmountReportExcelDownload = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_PREFUND_AMOUNT_DOWNLOAD_REPORT_EXCEL });
  };
};
